import axios from 'axios'

const baseUrl = '/api/login'

export default {
  login: async function(user) {
    const { data } = await axios.post(baseUrl, user)
    window.localStorage.setItem(
      'LoggedBloglistUser', JSON.stringify(data)
    ) 
    return data
  },
  getPersistentLogin: function() {
    const loggedUserJSON = window.localStorage.getItem('LoggedBloglistUser')
    if (loggedUserJSON) {
      return JSON.parse(loggedUserJSON)
    }
    return null
  },
  clearPersistentLogin: function() {
    window.localStorage.removeItem('LoggedBloglistUser')
  }
} 