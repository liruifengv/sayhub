<template>
  <el-row class="container">
    <el-col :span="10" :offset="5">
    <div class="tags_box">
      <router-link :to='`/tags/front_end`' class="tag" tag="span">前端</router-link>
      <router-link :to='`/tags/JavaScript`' class="tag" tag="span">JavaScript</router-link>
      <router-link :to='`/tags/CSS`' class="tag" tag="span">CSS</router-link>      
      <router-link :to='`/tags/Vue`' class="tag" tag="span">Vue</router-link>
      <router-link :to='`/tags/React`' class="tag" tag="span">React</router-link>      
      <router-link :to='`/tags/wechat`' class="tag" tag="span">微信公众号</router-link>
    </div>
     <router-view :articles="articles"></router-view>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'TagsPage',
    data () {
      return {
        articles: []
      }
    },
    components: {
    },
    created () {
      // console.log('标签页加载成功')
      this.getArticles()
    },
    methods: {
      getArticles () {
        this.$http.get('/articles')
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
  .tags_box{
    margin-top: 20px;
    padding-bottom: 15px;
  }
  .tag{
    font-size: 16px;
    color: #8590a6;
    padding: 15px;
    cursor: pointer;
    margin-right: 10px
  }
  span.router-link-active{
    font-weight: bold;
    color: #42b983;
    border-bottom: 3px solid #42b983;
  }
</style>
