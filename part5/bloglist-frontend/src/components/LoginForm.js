import React from 'react'
import { useField } from '../hooks'

const LoginForm = ({ onLogin }) => {
  const username = useField('text')
  delete username.reset
  const password = useField('password')
  delete password.reset

  return (
    <form onSubmit={(event) => onLogin(event, username.value, password.value)}>
      <div>
        username 
        <input {...username}/>
      </div>
      <div>
        password 
        <input {...password}/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
