<template>
  <el-row class="container">
    <el-col  :span="12" :xs="24" class="row">
      <div class="tags_box">
        <router-link :to='`/tags/front_end`' class="tag" tag="span">前端</router-link>
        <router-link :to='`/tags/JavaScript`' class="tag" tag="span">JavaScript</router-link>
        <router-link :to='`/tags/CSS`' class="tag" tag="span">CSS</router-link>      
        <router-link :to='`/tags/Vue`' class="tag" tag="span">Vue</router-link>
        <router-link :to='`/tags/React`' class="tag" tag="span">React</router-link>      
        <router-link :to='`/tags/wechat`' class="tag" tag="span">微信公众号</router-link>
      </div>
      <router-view :articles="articles" :getArticles = "getArticles"></router-view>
      <span v-show="articles.length === 0" class="no_articles">暂无相关文章</span>
      <div class="block" v-show="total > 1">
        <el-pagination
          layout="prev, pager, next"
          :page-count="total"
          @current-change="changePage"
          :current-page.sync="page">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'TagsPage',
    data () {
      return {
        articles: [],
        total: 0,
        page: 1
      }
    },
    components: {
    },
    created () {
      // console.log('标签页加载成功')
      this.getArticles()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route () {
        this.getArticles()
        this.page = 1
      }
    },
    methods: {
      getArticles () {
        if (this.$route.params.category) {
          this.$http.get(`/articles?category=${this.$route.params.category}&page=${this.page}&page_size=5`)
            .then(res => {
              if (res.status === 200) {
                this.articles = res.data.articles
                this.total = Math.ceil(res.data.total / 5)
              }
            })
        } else {
          this.$http.get(`/articles?page=${this.page}&page_size=5`)
            .then(res => {
              if (res.status === 200) {
                this.articles = res.data.articles
                this.total = Math.ceil(res.data.total / 5)
              }
            })
        }
      },
      changePage () {
        this.getArticles()
      }
    }
  }
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: center
  }
  .tags_box{
    margin-top: 20px;
    padding-bottom: 15px;
    text-align: center
  }
  .tag{
    font-size: 16px;
    color: #8590a6;
    padding: 10px;
    cursor: pointer;
    margin-right: 10px;
    line-height: 40px
  }
  span.router-link-active{
    font-weight: bold;
    color: #42b983;
    border-bottom: 3px solid #42b983;
  }
  .no_articles{
    display: flex;
    justify-content: center;
    margin-top: 100px
  }
  .block{
    text-align: center;
    margin-bottom: 20px;
    margin-top: 10px
  }
</style>
