<template>
  <header class="header">
    <nav class="inner">
      <router-link 
        to="/" 
        exact>
        <img 
          class="logo" 
          src="../assets/logo.png" 
          alt="logo">
      </router-link>
      <el-dropdown
        trigger="click"
        class="dropdown">
        <span class="el-dropdown-link">
          首页<i class="el-icon-caret-bottom el-icon--right"/>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link 
              to="/" 
              exact>首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/tags">标签</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">2222</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">3333</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/">4444</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="navTag">
        <el-autocomplete
          class="searchInput"
          v-model="search"
          :fetch-suggestions="fetchData"
          :trigger-on-focus="false"
          placeholder="Search Sayhub"
          icon="search"
          size="small"
        />
        <router-link 
          to="/" 
          exact 
          class="tag">首页</router-link>
        <router-link 
          to="/tags" 
          class="tag">标签</router-link>
        <router-link 
          to="/222" 
          class="tag">222</router-link>
        <router-link 
          to="/333" 
          class="tag">333</router-link>
        <router-link 
          to="/444" 
          class="tag">444</router-link>
      </div>
      <div class="btn_box">
        <router-link 
          to="/" 
          tag="span" 
          class="publish"><i class="el-icon-plus"/></router-link>
        <div class="navTag">
          <div v-show="!login_status">
          <router-link to='/login' tag="span">
            <el-button 
              size="small" 
              round>登录</el-button>
          </router-link>
          </div>
        </div>
        <div style="display: inline-block">
          <div 
            v-if="login_status" 
            class="login">
            <el-dropdown trigger="click" >
              <img 
                class="avatar" 
                src="../assets/avatar.jpg">
              <el-dropdown-menu 
                slot="dropdown" 
                class="menu">
                <router-link 
                  to="/" 
                  tag="span"
                  >
                  <el-dropdown-item>
                    <i class="mdi mdi-home-account"/> 主页
                  </el-dropdown-item>
                </router-link>
                <router-link 
                  to="/" 
                  tag="span">
                  <el-dropdown-item>
                    <i class="el-icon-setting"/> 设置
                  </el-dropdown-item>
                </router-link>
                <span @click="signout">
                  <el-dropdown-item>
                    <i class="mdi mdi-login-variant"/> 登出
                  </el-dropdown-item>
                </span>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    login_status () {
      return this.$store.state.login_status
    }
  },
  created () {
  },
  methods: {
    signout () {
      window.localStorage.clear()
      this.$store.commit('CHANGE_LOGIN_STATUS', false)
      this.$store.commit('GET_SAYHUB_TOKEN', '')
      // this.$store.commit('GET_USER_INFO', {})
    },
    fetchData () {
      console.log('Search Sayhub')
      console.log(this.search)
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  z-index: 500;
  height: 60px;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #fff;
  line-height: 60px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,34,77,.1);
}
.header .inner {
  max-width: 1150px;
  box-sizing: border-box;
  margin: 0px auto;
  position: relative;
}
.navTag {
  display: inline-block
}

a {
  text-decoration: none;
  color: #999999;
  display: inline-block;
  font-size: 14px
}
a.router-link-active, a:hover {
  color: #42b983;
}
a.tag {
  margin-left: 26px;
  font-weight: 600
}
.logo {
  width: 32px;
  height: 32px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 90px;
  border-radius: 50%
}
.searchInput {
  width: 300px;
  margin-left: 30px
}

.btn_box {
  display: inline-block;
  position: absolute;
  right: 80px
}

.dropdown {
  display: none
}

.el-dropdown-link {
  color: #108EE9;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
}

.publish {
  margin-right: 10px;
  cursor: pointer;
  font-size: 18px;
}

.login {
  color: #999999;
  font-size: 24px;
  position: relative;
}
.login span {
  display: inline-block;
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px
}

.login .avatar {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.avatar{
  position: relative;
  top: 5px;
  border-radius: 5px
}

.item {
  top: -10px;
  left: 28px;
  font-size: 12px;
  position: absolute
}

.menu {
  margin-top: -5px
}

@media screen and (max-width: 600px) {
  .navTag {
    display: none
  }
  .btn_box {
    position: fixed;
    right: 20px;
  }
  .dropdown {
    display: inline-block
  }
  .el-dropdown-link {
    margin-left: 20px
  }
}
@media screen and (max-width: 1150px) {
  .header {
    min-width: 1150px
  }
}
</style>
