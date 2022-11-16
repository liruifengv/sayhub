<template>
<el-row>
  <el-row class="contain" v-for="item in articles" :key="item.id">
    <ArticleItem :item="item" :type="'article'" :class="source === 'home' ? 'item' : 'articleItem'" :getArticles = "getArticles"/>
  </el-row>
</el-row>  
</template>

<script>
import ArticleItem from '../components/ArticleItem.vue'

export default {
  props: {
    source: {
      type: String
    },
    articles: {
      type: Array
    },
    getArticles: {
      type: Function
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style scoped>
  .articleItem {
    margin: 10px 5px 10px 0px;
    box-shadow: 0 1px 3px 0 rgba(255,255,255,.1);
  }
  .item{
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
  }
</style>
