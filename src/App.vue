<template>
  <div id="app">
    <HeaderNav/>
    <router-view class="view"/>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav'
import { instance } from './api/index'
export default {
  name: 'app',
  components: {
    HeaderNav
  },
  beforeCreate () {
    if (window.localStorage.getItem('sayhub_token')) {
      this.$store.commit('CHANGE_LOGIN_STATUS', true)
      this.$store.commit('GET_SAYHUB_TOKEN', window.localStorage.getItem('sayhub_token'))
      instance.defaults.headers.common['Authorization'] = `Bearer ` + window.localStorage.getItem('sayhub_token')
    } else {
      this.$store.commit('CHANGE_LOGIN_STATUS', false)
    }
  }
}
</script>

<style>
html {
  background: #f9f9f9;
}
body {
  max-height: 100vh;
  overflow-y: scroll;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.view {
  position: relative;
  top: 60px;
  min-height: calc(100vh - 60px)
}
</style>
