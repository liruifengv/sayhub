import * as types from './mutation-types'

export default {
  [types.GET_SAYHUB_TOKEN] (state, value) {
    state.sayhub_token = value
  },
  [types.CHANGE_LOGIN_STATUS] (state, bool) {
    state.login_status = bool
  },
  [types.GET_USERINFO] (state, info) {
    state.userInfo = info
  }
}
