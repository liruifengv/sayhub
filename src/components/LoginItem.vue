<template>
  <el-row class="row">
    <h1>Sayhub</h1>
    <el-input placeholder="用户名" v-model="username"></el-input>
    <el-input type="password" placeholder="密码" v-model="password"></el-input> 
    <el-button type="primary" v-if = "type === 'signup'" @click="signup()">注册</el-button>
    <el-button type="primary" v-else @click="login()">登录</el-button>
    <router-link to="/login" v-show = "type === 'signup'" tag="p">已有账号，去登录</router-link>
    <router-link to="/signup" v-show = "type === 'login'" tag="p">没有账号，去注册</router-link>
  </el-row>
</template>

<script>
export default{
  data () {
    return {
      username: '',
      password: '',
      sayhub_token: ''
    }
  },
  props: {
    type: {
      type: String
    }
  },
  methods: {
    signup () {
      if (this.username === '') {
        this.$message.warning('用户名不能为空哦~~')
      } else if (this.password === '') {
        this.$message.warning('密码不能为空哦~~')
      } else {
        this.$http.post(`/users`, {
          'username': this.username,
          'password': this.password
        }).then(res => {
          if (res.status === 200) {
            this.$message.success('注册成功')
            this.$router.push({ path: '/login' })
          }
        }).catch((error) => {
          this.$message.error(error.response.data.content)
        })
      }
    },
    login () {
      if (this.username === '') {
        this.$message.warning('用户名不能为空哦~~')
      } else if (this.password === '') {
        this.$message.warning('密码不能为空哦~~')
      } else {
        this.$http.post(`/login`, {
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.status === 200) {
            this.$message.success('登录成功')
            // console.log(res)
            this.sayhub_token = res.data.sayhub_token
            window.localStorage.setItem('sayhub_token', this.sayhub_token)
            this.$store.commit('GET_SAYHUB_TOKEN', this.sayhub_token)
            this.$store.commit('CHANGE_LOGIN_STATUS', true)
            this.$router.push('/')
          }
        }).catch((error) => {
          this.$message.error(error.response.data.content)
        })
      }
      // console.log('登陆成功')
    },
    get_profile () {
      this.$http.get('/profile')
        .then(res => {
          if (res.status === 200) {
            console.log(res.data)
            this.$store.commit('GET_USERINFO', res.data)
          }
        }).catch((error) => {
          this.$message.error(error.response.data.content)
        })
    }
  }
}
</script>

<style scoped>
.row{
  border: 1px solid #000;
  text-align: center;
  padding: 20px;
  line-height: 50px;
  background: #fff;
  width: 300px;  
}
p{
  font-size: 12px;
  cursor: pointer
}
</style>