import * as types from './mutation-types'
import { instance, getToken, getUserInfo } from '../api/index'

export const login = ({ commit }, info) => {
  return new Promise((resolve, reject) => {
    getToken(info).then(res => {
      if (res.status === 200) {
        commit(types.CHANGE_LOGIN_STATUS, true)
        commit(types.GET_SAYHUB_TOKEN, res.data.sayhub_token)
        instance.defaults.headers.common['Authorization'] = `Bearer ` + res.data.sayhub_token
        window.localStorage.setItem('sayhub_token', res.data.sayhub_token)
        resolve()
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

export const getUser = ({ commit }) => {
  return new Promise((resolve, reject) => {
    getUserInfo().then(res => {
      if (res.status === 200) {
        commit(types.GET_USER_INFO, res.data)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
