<template>
  <header class="header">
    <nav class="inner">
      <router-link to="/home" exact>
        <img class="logo" src="https://images.sayhub.me/logo.png" />
      </router-link>
      <el-dropdown trigger="click" class="dropdown">
        <span class="el-dropdown-link"> 首页<i class="el-icon-caret-bottom el-icon--right" /> </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/home" exact>首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/tags">标签</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/write">写文章</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/draft">草稿</router-link>
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
        <router-link to="/home" exact class="tag">首页</router-link>
        <router-link to="/tags" class="tag">标签</router-link>
        <router-link to="/write" class="tag">写文章</router-link>
        <router-link to="/draft" class="tag">草稿</router-link>
      </div>
      <div class="btn_box">
        <div class="nav">
          <div v-if="!login_status">
            <router-link to="/login" tag="span">
              <el-button size="small" round>登录</el-button>
            </router-link>
          </div>
        </div>
        <div style="display: inline-block">
          <div v-if="login_status" class="login">
            <el-dropdown trigger="click">
              <img class="avatar" src="https://images.sayhub.me/avatar.jpg" />
              <el-dropdown-menu slot="dropdown" class="menu">
                <el-dropdown-item>
                  <router-link :to="`/user/${this.userInfo.username}`" tag="span">
                    <i class="mdi mdi-home-account" /> 主页
                  </router-link>
                </el-dropdown-item>
                <router-link to="/settings" tag="span">
                  <el-dropdown-item> <i class="el-icon-setting" /> 设置 </el-dropdown-item>
                </router-link>
                <span @click="signout">
                  <el-dropdown-item> <i class="mdi mdi-login-variant" /> 登出 </el-dropdown-item>
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
import { mapState } from 'vuex'

export default {
  data() {
    return {
      search: '',
      articles: [],
    }
  },
  computed: {
    login_status() {
      return this.$store.state.login_status
    },
    ...mapState(['userInfo']),
  },
  created() {},
  methods: {
    signout() {
      this.$confirm('确认登出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          window.localStorage.clear()
          this.$store.dispatch('logOut')
          this.$router.push({ path: '/home' })
          window.location.reload()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消登出',
          })
        })
    },
    fetchData(string, cb) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        if (string && this.search === string) {
          this.articles = []
          this.$http.get(`/articles?title=${string}`).then((res) => {
            if (res.status === 200 && res.data.articles.length !== 0) {
              this.articles = res.data.articles.map((item) => {
                return Object.assign(item, {
                  value: item.title,
                })
              })
            }
            if (!this.articles.some((item) => item.id === -1)) {
              this.articles.push({ value: '没有想要的？去发表', id: -1 })
            }
            cb(this.articles)
            //          获取下拉框，改变最后一项监听的事件。
            this.$nextTick(() => {
              const el = document.getElementsByClassName('el-autocomplete-suggestion__list')[0]
              let len = el.childNodes.length
              for (let i = 0; i < len; i++) {
                el.childNodes[i].onclick = () => {
                  this.search = ''
                  const target = this.articles[i - 1]
                  if (target._id !== undefined) {
                    this.$router.push(`/article/${target._id}`)
                  } else {
                    this.$router.push('/write')
                  }
                }
              }
            })
          })
        }
      }, 500)
    },
  },
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
  line-height: 60px;
  background: rgba(22, 27, 32);
  box-shadow: 0 1px 3px 0 rgba(0, 34, 77, 0.1);
}
.header .inner {
  max-width: 1150px;
  box-sizing: border-box;
  margin: 0px auto;
  position: relative;
}
.navTag {
  display: inline-block;
}

a {
  text-decoration: none;
  color: #999999;
  display: inline-block;
  font-size: 14px;
}
a.router-link-active,
a:hover {
  color: #42b983;
}
a.tag {
  margin-left: 26px;
  font-weight: 600;
}
.logo {
  width: 32px;
  height: 32px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 90px;
  border-radius: 50%;
}
.searchInput {
  width: 300px;
  margin-left: 30px;
}

.btn_box {
  display: inline-block;
  position: absolute;
  right: 80px;
}

.dropdown {
  display: none;
}

.el-dropdown-link {
  color: #108ee9;
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
  margin-right: 20px;
}

.login .avatar {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.avatar {
  position: relative;
  top: 5px;
  border-radius: 5px;
}

.item {
  top: -10px;
  left: 28px;
  font-size: 12px;
  position: absolute;
}

.menu {
  margin-top: -5px;
}

@media screen and (max-width: 600px) {
  .navTag {
    display: none;
  }
  .btn_box {
    position: fixed;
    right: 20px;
  }
  .dropdown {
    display: inline-block;
  }
  .el-dropdown-link {
    margin-left: 20px;
  }
}
@media screen and (max-width: 1150px) {
  .header {
    min-width: 1150px;
  }
}
</style>
