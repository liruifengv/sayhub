import Axios from 'axios'

if (window.localStorage.getItem('token')) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('token')
}

export let instance = Axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://sayhub.me/api' : 'http://sayhub.me/api'
})

export const getToken = ({ login_user, login_password }) => {
  return instance.post('/login', {
    username: login_user,
    password: login_password
  })
}

export const getUserInfo = () => {
  return instance.get('/profile')
}
