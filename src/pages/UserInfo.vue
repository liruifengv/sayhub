<template>
  <div>
    <el-col :span="3" :xs="24" class="item"></el-col>    
    <el-col :span="10" :xs="24" class="item userInfoBox">
      <div class="userInfo">
        <div class="box">
          <img src="http://images.sayhub.me/avatar.jpg" class="avatar"/>
          <p class="userName">{{userInfo.username}}</p>
        </div>
        <div class="box">
          <span class="label">个性签名：</span>
          <span class="bio">{{userInfo.bio === '' ? '--' : userInfo.bio}}</span>
        </div>
        <div class="box">
          <span class="label">邮箱：</span>
          <span class="bio">{{userInfo.email === '' ? '--' : userInfo.email}}</span>
        </div>
        <div class="box">
          <span class="label">公司</span>
          <span class="bio">{{userInfo.company === '' ? '--' : userInfo.company}}</span>
        </div>
        <div class="box">
          <span class="label">GitHub：</span>
          <span class="bio">{{userInfo.github === '' ? '--' : userInfo.github}}</span>
        </div>
        <div class="box">
          <span class="label">个人主页：</span>
          <span class="bio">{{userInfo.homepage === '' ? '--' : userInfo.homepage}}</span>
        </div>
      </div>
    </el-col>
    <el-col :span="8" :xs="24" class="Article_box">
      <div class="article"  v-for="(item,index) in articles" :key="index">
        <router-link :to='`/article/${item._id}`' class="title">
          {{item.title}}
        </router-link>
        <div class="author_box">
          <router-link :to='`/user/${item.author}`' tag="span">
          <span class="author">{{item.author}}</span>
          </router-link>
          <span class="date">{{item.created}}</span>
        </div>
      <p class="abstract">{{item.content_text}}</p>
      </div>
    </el-col>    
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: {},
      articles: [],
      time: ''
    }
  },
  created () {
    this.getUserInfo()
    this.getArticles()
  },
  methods: {
    getUserInfo () {
      this.$http.get(`users/${this.$route.params.username}`)
        .then(res => {
          if (res.status === 200) {
            this.userInfo = res.data
          }
        })
    },
    getArticles () {
      this.$http.get(`users/${this.$route.params.username}/articles`)
        .then(res => {
          if (res.status === 200) {
            this.articles = res.data
          }
        })
    }
  }
}
</script>

<style scoped>
.item {
  margin-right: 20px;
  margin-top: 20px;
  padding: 10px;
}
.box{
  margin-top:20px;
  display: flex;
  justify-content: flex-start;
}
.avatar {
  width: 160px;
  height: 160px;
  border-radius: 4px;
  border: 1px solid #fff;
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
.Article_box {
  margin-top:20px;
  background: #fff;
}
.userInfoBox {
  background: #fff;
  height: 100%;
}
.article {
  margin-top:10px;
  border-bottom: 1px solid #ddd;
}
.title{
  color: #000;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin: 0px 16px 16px 0;
  overflow: hidden;
  text-overflow: ellipsis;
 	display: -webkit-box;
 	-webkit-line-clamp: 2;
 	-webkit-box-orient: vertical;
  text-decoration: none;
  word-wrap:break-word
}

.title:hover {
  color: #42b983
}
.abstract{
  color: #262626;
  line-height: 20px;
  max-height: 60px;
  font-size: 15px;
  margin-top: 9px;
  overflow: hidden;
  cursor:auto;
  position: relative;
}
.abstract:after {
    content:"...";
    position:absolute;
    bottom:0;
    background:#FFF;
    padding-left:0.2em;
    background:url(http://css88.b0.upaiyun.com/css88/2014/09/ellipsis_bg.png) repeat-y;
}
</style>

