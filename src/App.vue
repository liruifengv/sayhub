<!--
 * @Author: your name
 * @Date: 2020-11-11 18:30:43
 * @LastEditTime: 2021-01-20 17:36:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Sayhub-vue\src\App.vue
-->
<template>
  <div id="app">
    <HeaderNav v-if="nav_show"/>
    <router-view class="view" />
  </div>
</template>

<script>
  import HeaderNav from './components/HeaderNav'
  export default {
    name: 'app',
    components: {
      HeaderNav
    },
    computed: {
      nav_show () {
        return this.$store.state.nav_show
      }
    }
  }
</script>

<style>
  html {
  }
  body {
    max-height: 100vh;
    overflow-y: scroll;
    margin: 0;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .view {
    position: relative;
    top: 60px;
    min-height: calc(100vh - 60px);
    background: rgba(6,9,15);
  }
  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }
  .v-note-wrapper .v-note-op {
    box-shadow: none !important;
  }
</style>
