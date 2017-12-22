import Axios from 'axios'

if (window.localStorage.getItem('token')) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('token')
}

export let instance = Axios.create({
  baseURL: 'http://localhost:3000/api'
})
