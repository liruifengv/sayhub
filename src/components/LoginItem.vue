<template>
  <el-row class="row">
    <h1>Sayhub</h1>
    <el-input placeholder="用户名" v-model="username"></el-input>
    <el-input placeholder="密码" v-model="password"></el-input> 
    <el-button type="primary" v-if = "type === 'signin'" @click="signin()">注册</el-button>
    <el-button type="primary" v-else @click="login()">登录</el-button>
    <router-link to="/login" v-show = "type === 'signin'" tag="p">已有账号，去登录</router-link>
    <router-link to="/signin" v-show = "type === 'login'" tag="p">没有账号，去注册</router-link>
  </el-row>
</template>

<script>
export default{
  data () {
    return {
      username: '',
      password: ''
    }
  },
  props: {
    type: {
      type: String
    }
  },
  methods: {
    signin () {
      console.log('注册成功')
    },
    login () {
      console.log('登陆成功')
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