<template>
   <el-row class="view">
   <el-col :span="5" :xs="24" class="empty"></el-col>
    <el-col :span="10" :xs="24" class="left">
       <div class="grid-content bg-purple box">
        <el-row class="title">
          发表过的文章
        </el-row>
         <ArticleItem :source="'home'" class="item" v-for="item in articles" :key="item._id" :item = "item" :getArticles = "getArticles"/>
         <div v-show="articles.length === 0" class="noData">
          <img src="../../static/create.png"/>
          <div>暂无文章</div>
        </div>
       </div>
     </el-col>
    <el-col :span="5" :xs="24" class="right">
      <LeftItem :item="userInfo"/>
    </el-col>
   </el-row>
</template>

<script>
  import ArticleItem from '../components/ArticleItem.vue'
  import LeftItem from '../components/LeftItem.vue'

export default {
    name: 'UserInfo',
    data () {
      return {
        userInfo: {},
        articles: []
      }
    },
    components: {
      LeftItem,
      ArticleItem
    },
    created () {
      this.getUserInfo()
      this.getArticles()
    },
    methods: {
      getUserInfo () {
        this.$http.get(`users/${this.$route.params.username}`).then(res => {
          if (res.status === 200) {
            this.userInfo = res.data
          }
        })
      },
      getArticles () {
        this.$http
          .get(`users/${this.$route.params.username}/articles`)
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
.el-col {
  margin-top: 20px;
}
.grid-content {
  padding: 15px;
}
.left,
.right {
  background: #fff;
}
.left {
  margin-right: 20px;
  margin-bottom: 20px;
  min-height: 556px;
}
.title {
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  padding: 0 15px 5px 15px;
}

.end {
  color: #42b983;
  text-align: center;
  margin-top: 20px;
}
.noData {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20%;
}
@media screen and (max-width: 600px) {
  .view {
    display: flex;
    flex-direction: column;
  }
  .left {
    order: 2
  }
  .right {
    order: 1
  }
  .empty {
    display: none;
  }
}
</style>

