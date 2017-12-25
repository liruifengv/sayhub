import Vue from 'vue'
import Vuex from 'vuex'
import 'babel-polyfill'

import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  sayhub_token: '',
  login_status: false
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug
})
