<template>
<el-row>
  <el-row class="contain" v-for="article in articles" :key="article.id">
    <ArticleItem :article="article" class="item" :type="'tags'"/>
  </el-row>
</el-row>  
</template>

<script>
import ArticleItem from '../components/ArticleItem.vue'

export default {
  props: {
    articles: {
      type: Array
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style scoped>
  .item {
    margin: 10px 5px 10px 0px;
    box-shadow: 0 1px 3px 0 rgba(0,34,77,.1);
    background: #fff;
  }
</style>
