<template class="view">
  <el-row>
    <el-col :span="5" :xs="24" class="empty"></el-col>
    <el-col :span="10" :xs="24" class="left">
      <div class="grid-content bg-purple box">
        <el-row class="title">
          <div class="sort">
            <router-link :to='`/home`' tag="span" exact>
              <router-link :to='`/home/?sort=hot`' tag="span">热门&nbsp;</router-link> 
            </router-link>
            | 
            <router-link :to='`/home/?sort=new`' tag="span">&nbsp;最新</router-link>
          </div>
        </el-row>
        <router-view :articles="articles" :getArticles = "getArticles" :source="'home'"></router-view>
        <el-row v-show="end" class="end">到底了</el-row>
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
        articles: [],
        next: '',
        total: '',
        end: false,
        flag: true
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
      ]),
      ordering () {
        if (this.$route.query.sort === 'new') {
          return 'new'
        } else {
          return 'hot'
        }
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route () {
        this.getArticles()
      }
    },
    created () {
      this.getArticles()
      window.onscroll = () => {
        const body = document.body
        if (body.scrollHeight - window.pageYOffset < body.offsetHeight + 130) {
          this.getMore()
        }
      }
    },
    methods: {
      getArticles () {
        this.$http.get(`/articles?page=1&page_size=10&sort=${this.ordering}`)
          .then(res => {
            if (res.status === 200) {
              this.articles = res.data.articles
              this.next = res.data.next
              this.total = res.data.total
            }
          })
      },
      getMore () {
        if (this.next !== null && this.flag) {
          if (this.next > this.total / 10) {
            this.end = true
          } else {
            this.flag = false
            this.end = false
            this.$http.get(`/articles?page=${this.next}&page_size=10&sort=${this.ordering}`)
              .then(res => {
                if (res.status === 200) {
                  this.articles = [...this.articles, ...res.data.articles]
                  this.next = res.data.next
                  this.total = res.data.total
                }
                this.flag = true
              })
          }
        }
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
  span.router-link-exact-active, span:hover {
    color: #42b983;
  }
  .end {
    color: #42b983;
    text-align: center;
    margin-top: 20px;
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
