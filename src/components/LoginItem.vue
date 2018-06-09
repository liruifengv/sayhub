<template>
  <el-row class="login-style">
    <h1>Sayhub</h1>
    <el-input placeholder="用户名" v-model="username"></el-input>
    <el-input type="password" placeholder="密码" v-model="password"></el-input>
    <el-input type="password" placeholder="确认密码" v-if = "type === 'signup'" v-model="re_password"></el-input>    
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
      re_password: '',
      sayhub_token: ''
    }
  },
  props: {
    type: {
      type: String
    }
  },
  methods: {
    // 注册
    signup () {
      const usernameReg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
      const passwordReg = /^.{6,}$/g
      if (this.username === '') {
        this.$message.warning('用户名不能为空哦~~')
      } else if (usernameReg.test(this.username) === false) {
        this.$message.warning('用户名只能以字母开头，5-16位，允许字母数字下划线')
      } else if (this.password === '') {
        this.$message.warning('密码不能为空哦~~')
      } else if (passwordReg.test(this.password) === false) {
        this.$message.warning('密码不能少于6位')
      } else if (this.re_password === '') {
        this.$message.warning('请再次输入密码~')
      } else if (this.password !== this.re_password) {
        this.$message.warning('两次密码必须相同~')
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
    // 登陆
    login () {
      if (this.username === '') {
        this.$message.warning('用户名不能为空哦~~')
      } else if (this.password === '') {
        this.$message.warning('密码不能为空哦~~')
      } else {
        this.$store.dispatch('login', {
          login_user: this.username,
          login_password: this.password
        }).then(() => {
          this.$store.dispatch('getUser')
          this.$router.push('/')
        }).catch((error) => {
          this.$message.error(error.response.data.content)
        })
      }
    }
  }
}
</script>

<style scoped>
.login-style{
  border: 1px solid #fff;
  text-align: center;
  padding: 20px;
  line-height: 50px;
  background: #fff;
  width: 300px;
  box-shadow: 0 1px 3px 0 rgba(0,34,77,.5);
}
p{
  font-size: 12px;
  cursor: pointer
}
</style>