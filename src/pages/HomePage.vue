<template class="view">
  <el-row>
    <el-col :span="5" :xs="24" class="empty"></el-col>
    <el-col :span="10" :xs="24" class="left">
      <div class="grid-content bg-purple box">
        <el-row class="title">
          <div class="sort">
            <router-link to='/' exact tag="span">热门</router-link> 
            | 
            <router-link to='/tags' tag="span">最新</router-link>
          </div>
        </el-row>
        <ArticleItem class="item" v-for="item in articles" :key="item._id" :item = "item" :getArticles = "getArticles"/>
      </div>
    </el-col>
    <el-col :span="3" :xs="24" class="right">
      <!-- <LeftItem /> -->
      <Item :type="'signup'" v-if="!this.login_status"/>      
    </el-col>
  </el-row>
</template>

<script>
  import ArticleItem from '../components/ArticleItem.vue'
  import LeftItem from '../components/LeftItem.vue'
  import Item from '../components/LoginItem'
  import { mapState } from 'vuex'
  
  export default {
    name: 'HomePage',
    data () {
      return {
        articles: []
      }
    },
    components: {
      ArticleItem,
      LeftItem,
      Item
    },
    computed: {
      login_status () {
        return this.$store.state.login_status
      },
      ...mapState([
        'userInfo'
      ])
    },
    created () {
      console.log('首页加载成功')
      this.getArticles()
      // this.postArticles()
    },
    methods: {
      getArticles () {
        this.$http.get(`/articles?page=1&page_size=10`)
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
  .item:not(:last-child){
    border-bottom: 1px solid #ddd;
  }
  .left,.right {
    background: #fff;
  }
  .left {
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .title {
    border-bottom: 1px solid #ddd;
    padding: 0 15px 5px 15px;
  }
  .sort {
    float: right;
  }
  .sort span {
    cursor: pointer;
    font-size: 14px;
    color: #90979c;
  }
  .login-style{
    border: none !important;
    box-shadow: none !important;
  }
  span.router-link-active, span:hover {
    color: #42b983;
  }
  @media screen and (max-width: 600px) {
    .view {
      display: flex;
      flex-direction: column
    }
    .empty{
      display: none
    }

  }
</style>
