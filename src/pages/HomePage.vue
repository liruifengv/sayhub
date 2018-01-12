<template class="view">
  <el-row>
    <el-col :span="3" :xs="24" class="empty"></el-col>
    <el-col :span="5" :xs="24" class="left">
      <LeftItem />
    </el-col>
    <el-col :span="15" :xs="24" class="right">
      <div class="grid-content bg-purple box">
        <ArticleItem class="item" v-for="item in articles" :key="item._id" :item = "item" :getArticles = "getArticles"/>
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
    margin-top: 20px;
  }
  .grid-content {
    padding: 15px
  }
  .item{
    display: inline-block;
    margin: 0px 5px 20px 0px;
    box-shadow: 0 1px 3px 0 rgba(0,34,77,.1);
  }
  @media screen and (max-width: 600px) {
    .view {
      display: flex;
      flex-direction: column-reverse
    }
    .empty{
      display: none
    }
    .grid-content {
      padding: 0
    }
    .item{
      box-shadow: none
    }
  }
</style>
