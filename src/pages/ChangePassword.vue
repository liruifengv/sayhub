<template>
<el-row>
  <div class="container">
    <div class="row">
      <div class="box">
        <h1>修改密码</h1>
        <ul class="account-list">
          <li class="item">
            <div class="title">
              <span>旧密码</span>
            </div>
            <div class="input-box">
              <input class="input" type="password" v-model="user.oldPassword" placeholder="请输入原密码">
              <!-- <router-link to="/reset-password" tag="span">
                <el-button type="text" class="forgot" >忘记密码 ?</el-button>
              </router-link> -->
            </div>
          </li>
          <li class="item">
            <div class="title">
              <span>新密码</span>
            </div>
            <div class="input-box">
              <input class="input" type="password" v-model="user.newPassword" placeholder="请输入新密码">
            </div>
          </li>
           <li class="item">
            <div class="title">
              <span>确认新密码</span>
            </div>
            <div class="input-box">
              <input class="input" type="password" v-model="user.againPassword" placeholder="请再次输入新密码">
            </div>
          </li>
        </ul>
        <el-button type="primary" size="large" class="save" @click="save">保存修改</el-button>
      </div>
    </div>
  </div>
</el-row>
</template>

<script>

export default {
  data () {
    return {
      user: {
        oldPassword: '',
        newPassword: '',
        againPassword: ''
      }
    }
  },

  methods: {
    save () {
      if (this.user.oldPassword === '' || this.user.newPassword === '' || this.user.againPassword === '') {
        this.$message.warning('密码不能为空哦~~')
      } else if (this.user.againPassword !== this.user.newPassword) {
        this.$message.warning('两次新密码必须相同哦~~')
      } else {
        this.$http.post(`/users/password/change`, {
          oldPassword: this.user.oldPassword,
          newPassword: this.user.newPassword
        }).then(res => {
          if (res.status === 200) {
            this.$message.success('修改成功，请重新登录~')
            setTimeout(() => {
              window.localStorage.clear()
              this.$store.dispatch('logOut')
              this.$router.push({ path: '/login' })
            }, 1000)
          }
        }).catch((error) => {
          this.$message.error(error.response.data.content)
        })
      }
    }
  }
}
</script>

<style scoped>
  .view {
    position: relative;
    top: 50px !important;
    min-height: calc(100vh - 100px) !important;
  }
 .container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 90%;
    margin-top: 60px;
  }
  .row{
    width: 820px;
    height: 400px;
    background: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
    padding: 30px;
    border-radius: 3px;
  }
  .item{
    line-height: 70px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-top: 1px solid #D9D9D9;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
  }
  .item:last-of-type {
    border-bottom:  1px solid #D9D9D9
  }
  .box{
    margin-left: -30px;
  }
  .box h1{
    position: relative;
    left: 40px;
    font-size: 22px;
  }
  .input-box {
    width: 80%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content:space-between;
  }
  .action-box{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content:space-between;
  }
  .input{
    margin-right: 10px;
    border: none;
    outline: none;
    color: #000;
    width: 500px;
    font-size: 16px;
  }
  .save{
    float: right;
    font-size: 16px;
}
  ::-webkit-input-placeholder { /* WebKit browsers */  
    color: #D9D9D9;  
  }  
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
   color: #D9D9D9;  
   opacity: 1;  
  }  
  ::-moz-placeholder { /* Mozilla Firefox 19+ */  
   color: #D9D9D9;  
   opacity: 1;  
  }  
  :-ms-input-placeholder { /* Internet Explorer 10+ */  
   color: #D9D9D9;  
  } 
  @media screen and (max-width: 600px){
  .view{
    background: #fff;
    margin-top:10px; 
  }
  .container{
    width: 95%;
    height: 100%;
  }
  .row{
    padding: 20px;
    width: 100%;	
    box-shadow:none;
    box-sizing: border-box;
  }
  .item{
    line-height: 40px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .input-box{
    width: 100%;
    justify-content: space-between;
  }
  .box{
    margin-left: -15px;
  }
}
</style>
