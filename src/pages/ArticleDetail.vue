<template>
  <el-row class="container">
    <el-col  :span="12" :xs="24" class="article">
      <h1 class="title">{{article.title}}</h1>
      <span class="author">{{article.author}}</span>
      <span class="date">发表日期: {{article.created}}</span>
      <el-row class="markdown-body">
        <p class="content">{{article.content}}</p>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default{
  data () {
    return {
      article: {}
    }
  },
  components: {
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    isUser () {
      if (this.userInfo) {
        if (this.userInfo.username === this.article.author) {
          return true
        } else {
          return false
        }
      }
    }
  },
  created () {
    this.getArticle()
  },
  methods: {
    getArticle () {
      this.$http.get(`/article/${this.$route.params.id}`)
      .then(res => {
        if (res.status === 200) {
          // console.log(res.data)
          this.article = res.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.article{
  padding: 15px;
  box-sizing: border-box
}
.author,.date{
  font-size: 15px;
  color: #8590a6;
  margin-right: 10px;
}
.content{
  padding-top: 10px;
  font-size: 16px;
  text-align: left;
  color: #000;
  line-height: 30px;
}
</style>