import React, { useState, useEffect, useCallback, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import LogoutButton from './components/LogoutButton'
import loginService from './services/login'
import blogService from './services/blogs'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

export default function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notifMsg, setNotifMsg] = useState('')
  const [notifType, setNotifType] = useState('info')
  const [notifIsVisible, setNotifIsVisible] = useState(false)

  const blogFormRef = useRef()
  const blogFormToggleRef = useRef()

  const getBlogs = useCallback(
    async () => {
      try {
        const res = await blogService.getAll()
        setBlogs(res)
      } catch(err) {
        notify(`${err}`, 'error')
      }
    }, 
    []
  )

  useEffect(() => { getBlogs() }, [getBlogs])

  useEffect(() => {
    const persistentLogin = loginService.getPersistentLogin()
    if (persistentLogin) {
      setUser(persistentLogin)
    }
  }, [])

  const notify = (message, type) => {
    setNotifMsg(message)
    setNotifType(type)
    setNotifIsVisible(true)
    setTimeout(() => {
      setNotifIsVisible(false)
    }, 5000)
  }
  
  const handleLogin = async (event, username, password) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      notify(`${user.name} logged in`, 'info')
    } catch(err) {
      if (err.response.status === 401) {
        notify('wrong username or password', 'error')
      } else {
        notify(`${err}`, 'error')
      }
    }
  }

  const handleLogout = () => {
    notify(`${user.name} logged out`, 'info')
    setUser(null)
    loginService.clearPersistentLogin()
  }

  const handleAddBlog = async (event, blog) => {
    event.preventDefault()
    try {
      const created = await blogService.create(blog, user.token)
      notify(`a new blog ${created.title} by ${created.author} added`, 'info')
      getBlogs()
      blogFormRef.current.resetFields()
      blogFormToggleRef.current.toggleVisibility()
    } catch(err) {
      notify(`${err}`, 'error')
    }
  }

  const handleLike = async (event, blog) => {
    event.stopPropagation()
    const updated = { ...blog, likes: blog.likes + 1 }
    try {
      const res = await blogService.update(updated, user.token)
      notify(`liked ${res.title} by ${res.author}`, 'info')
      getBlogs()
    } catch(err) {
      notify(`${err}`, 'error')
    }
  }

  const handleRemove = async (event, blog) => {
    event.stopPropagation()
    if (!window.confirm(`remove ${blog.title} by ${blog.author} ?`)) return
    try {
      await blogService.remove(blog, user.token)
      notify(`removed ${blog.title} by ${blog.author}`, 'info')
      getBlogs()
    } catch(err) {
      notify(`${err}`, 'error')
    }
  }

  const showNotification = () => (
    <Notification message={notifMsg} type={notifType} display={notifIsVisible}/>
  )

  const showLoginForm = () => (
    <div>
      <h2>log in to application</h2>
      {showNotification()}
      <LoginForm 
        onLogin={handleLogin}
      />
    </div>
  )

  const showBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    
    return (
      <div>
        <h2>blogs</h2>
        {showNotification()}
        <p>{user.name} logged in <LogoutButton onLogout={handleLogout} /></p>
        <Togglable buttonLabel="new note" ref={blogFormToggleRef}>
          <h2>create new</h2>
          <AddBlogForm ref={blogFormRef} onAddBlog={handleAddBlog} />
        </Togglable>
        {sortedBlogs.map(blog => <Blog 
          key={blog.id} 
          blog={blog} 
          onLike={handleLike} 
          onRemove={handleRemove}
          showRemove={blog.user.username === user.username}
        />)}
      </div>
    )
  }

  return (
    <div className="App">
      {user ? showBlogs() : showLoginForm()}
    </div>
  )
}
