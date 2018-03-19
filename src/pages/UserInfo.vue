<template>
  <div>
    <el-col :span="3" :xs="24" class="item"></el-col>    
    <el-col :span="10" :xs="24" class="item">
      <div class="userInfo">
        <div class="box">
          <img src="http://images.sayhub.me/avatar" class="avatar"/>
          <p class="userName">liruifengv</p>
        </div>
        <div class="box">
          <span class="label">个性签名：</span>
          <span class="bio">一切能用 JavaScript 写成的，终将用 JavaScript 写成。 </span>
        </div>
        <div class="box">
          <span class="label">邮箱：</span>
          <span class="bio">li15227870916@gmail.com</span>
        </div>
        <div class="box">
          <span class="label">所在行业：</span>
          <span class="bio">互联网</span>
        </div>
      </div>
    </el-col>
    <el-col :span="8" :xs="24" class="item">222</el-col>    
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    console.log('用户页初始化')
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$http.get(`users/${this.$route.params.username}`)
        .then(res => {
          if (status === 200) {
            console.log(res.data)
          }
        })
    }
  }
}
</script>

<style scoped>
.item {
  border: 1px solid #666;
  height: 1000px;
  margin-right: 20px;
  margin-top: 20px;
  padding: 10px;
}
.box{
  display: flex;
  justify-content: flex-start;
}
.avatar {
  width: 160px;
  height: 160px;
  border-radius: 4px;
  border: 3px solid #dddddd;
}
.userName {
  font-size: 26px;
  font-weight: 600;
  line-height: 30px;
  margin-left: 20px;
  margin-top: 120px;
}
.label{
  font-size: 16px;
  font-weight: 600
}
.bio{}
</style>

