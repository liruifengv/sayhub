<template>
  <div id="app">
    <HeaderNav/>
    <router-view class="view"/>
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav'
export default {
  name: 'app',
  components: {
    HeaderNav
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
  margin: 0
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
