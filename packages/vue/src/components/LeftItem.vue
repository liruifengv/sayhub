<template>
  <el-row class="container">
    <div class="userInfo">
      <div class="ImgBox">
        <img src="http://images.sayhub.me/logo.png" class="avatar" />
        <p class="userName">{{ item.username }}</p>
      </div>
      <div class="box">
        <span class="label">个性签名：</span>
        <span class="bio">{{ item.bio === '' ? '--' : item.bio }}</span>
      </div>
      <div class="box">
        <span class="label">邮箱：</span>
        <span class="bio">{{ item.email === '' ? '--' : item.email }}</span>
      </div>
      <div class="box">
        <span class="label">公司：</span>
        <span class="bio">{{ item.company === '' ? '--' : item.company }}</span>
      </div>
      <div class="box">
        <span class="label">GitHub：</span>
        <span class="bio">{{ item.github === '' ? '--' : item.github }}</span>
      </div>
      <div class="box">
        <span class="label">个人主页：</span>
        <span class="bio">{{ item.homepage === '' ? '--' : item.homepage }}</span>
      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
    },
  },
  methods: {},
}
</script>

<style scoped>
.userInfo {
  padding: 20px;
}
.box {
  display: flex;
  justify-content: space-between;
  line-height: 20px;
  margin-top: 10px;
}
.bg-purple {
  border: 1px solid #fff;
}
.grid-content {
  border-radius: 4px;
  padding: 15px;
}
.avatar {
  width: 230px;
  height: 230px;
}
.user {
  border-bottom: 1px solid #d9d9d9;
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
.bio {
  margin-bottom: 12px;
  overflow: hidden;
  font-size: 14px;
  color: #6a737d;
}
.message {
  margin-top: 20px;
  line-height: 25px;
}
a {
  color: #0366d6;
  text-decoration: none;
}
.message-item {
  font-size: 14px;
  margin-left: 5px;
}
@media screen and (max-width: 600px) {
  .ImgBox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .box {
    border-bottom: 1px solid #ddd;
  }
}
</style>
