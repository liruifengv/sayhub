<template>
  <el-row class="container">
    <div class="grid-content bg-purple">
      <img src="../assets/avatar.jpg" class="avatar" />
      <div class="user">
        <h1 class="userName">李瑞丰v</h1>
        <p class="userEnglishName">liruifengv</p>
        <p class="bio">来生再修好皮囊</p>        
      </div>
      <div class="message">
      <i class="mdi mdi-account-multiple"></i><span class="message-item">应届校招求坑!</span>
      <i class="el-icon-message"><a href="mailto:li15227870916@gmail.com" target="_blank" class="message-item">li15227870916@gmail.com</a></i>
      <br>
      <i class="mdi mdi-link-variant"></i><a href="http://www.sayhub.me" target="_blank" class="message-item">http://www.sayhub.me</a>
      </div>
    </div>
  </el-row>
</template>

<script>

export default{
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped>
  .bg-purple {
    border: 1px solid #fff
  }
  .grid-content {
    border-radius: 4px;
    min-height: 700px;
    padding: 15px
  }
  .avatar{
    width:230px;
    height:230px
  }
  .user {
    border-bottom: 1px solid #d9d9d9
  }
  .userName {
    font-size: 26px;
    line-height: 30px;
    font-weight: bold;
  }
  .userEnglishName {
    font-size: 20px;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
    color: #666;
    margin-top: -15px;
  }
  .bio{
    margin-bottom: 12px;
    overflow: hidden;
    font-size: 14px;
    color: #6a737d;
  }
  .message{
    margin-top:20px;
    line-height: 25px
  }
  a{
    color: #0366d6;
    text-decoration: none;
  }
  .message-item{
    font-size: 14px;
    margin-left: 5px;
  }
</style>