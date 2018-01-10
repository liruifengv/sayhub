<template class="view">
  <el-row :gutter="20">
    <el-col :span="3" :xs="24" class="left"></el-col>
    <el-col :span="5" :xs="24" class="left">
    <LeftItem />
    </el-col>
    <el-col :span="15" :xs="24" class="right">
      <div class="grid-content bg-purple box">
        <ArticleItem class="item" v-for="article in articles" :key="article._id" :article = "article" :getArticles = "getArticles"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import ArticleItem from '../components/ArticleItem.vue'
  import LeftItem from '../components/LeftItem.vue'
  export default {
    name: 'HomePage',
    data () {
      return {
        articles: []
      }
    },
    components: {
      ArticleItem,
      LeftItem
    },
    created () {
      console.log('首页加载成功')
      this.getArticles()
      // this.postArticles()
    },
    methods: {
      getArticles () {
        this.$http.get(`/articles?page=1&page_size=6`)
          .then(res => {
            if (res.status === 200) {
              this.articles = res.data.articles
            }
          })
      }
    }
  }
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
    margin-top: 20px;
  }
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
  .view{
    background: #fff
  }
  .item{
    display: inline-block;
    margin: 0px 5px 20px 0px;
    box-shadow: 0 1px 3px 0 rgba(0,34,77,.1);
  }
</style>
