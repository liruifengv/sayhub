// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import 'mdi/css/materialdesignicons.min.css'
import './style/element.css'
import { instance } from './api/index'
import store from './store/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI)
Vue.use(mavonEditor)

Vue.prototype.$http = instance

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let path = to.path
  if (window.localStorage.getItem('sayhub_token')) {
    store.commit('CHANGE_LOGIN_STATUS', true)
    store.commit('GET_SAYHUB_TOKEN', window.localStorage.getItem('sayhub_token'))
    instance.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('sayhub_token')
  }
  if (path === '/') {
    if (window.localStorage.getItem('sayhub_token')) {
      store.dispatch('getUser')
    }
    router.push('/home')
  } else if (path === '/settings') {
    router.push('/settings/profile')
  } else {
    if (window.localStorage.getItem('sayhub_token')) {
      store.dispatch('getUser')
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")