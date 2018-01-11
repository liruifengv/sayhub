<template>
  <el-row class="container">
    <el-col  :span="12" :xs="24" class="article">
      <h1 class="title">{{article.title}}</h1>
      <span class="author">{{article.author}}</span>
      <span class="date">发表日期: {{article.created}}</span>
      <el-row class="markdown-body">
        <p class="content" v-html="article.content_render"></p>
      </el-row>
      <router-link :to='`/tags/${item}`' tag="span" class="category" v-for="item in article.category" :key="item">{{item}}</router-link>
      <div class="footer">
        <span class="goal" :class="{highlight: article.is_up}" @click="vote">
          <span class="text">
            <i class="mdi mdi-thumb-up-outline"></i>
          </span>&nbsp;{{article.votes_count}}
        </span>
        <div class="edit" v-if="isOwner">
          <router-link :to='`/article/${article._id}/edit`' tag="span">
              <i class="el-icon-edit"></i> 编辑
          </router-link>
          <span @click="toDelete" class="delete">
            <i class="el-icon-delete"></i> 删除
          </span>
        </div>
      </div>
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
    isOwner () {
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
          console.log(res.data)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    vote () {
      if (this.userInfo) {
        if (this.isOwner === false) {
          if (this.article.is_up) {
            this.$http.delete(`/article/${this.article._id}/up`)
              .then(res => {
                if (res.status === 200) {
                  this.article.votes_count = res.data.votes_count
                  this.article.is_up = false
                }
              })
          } else {
            this.$http.post(`/article/${this.article._id}/up`)
              .then(res => {
                if (res.status === 200) {
                  this.article.votes_count = res.data.votes_count
                  this.article.is_up = true
                }
              })
          }
        } else {
          this.$message.error('不能给自己点赞！')
        }
      } else {
        this.$message.error('请登录后点赞！')
      }
    },
    toDelete () {
      this.$http.delete(`/article/${this.article._id}`)
        .then(res => {
          if (res.status === 200) {
            this.$message.success('删除成功~')
            this.$router.push('/')
          }
        }).catch(err => {
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
  padding-bottom: 100px 
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
.markdown-body{
  margin-bottom: 20px;
}
.category{
  margin: 0 16px 16px 0;
  padding: 8px 10px;
  height: 30px;
  line-height: 30px;
  max-width: 100%;
  background: rgba(0,0,0,.06);
  color: #666768;
  border-radius: 15px;
  text-align: center;
  font-size: 14px;
  cursor: pointer
}
.category:hover{
  background: #d3d3d3
}
.footer{
  margin-top: 50px;
  display: flex;
  justify-content: space-between
}
.goal{
  cursor: pointer;
  margin-left: 10px;
  display: inline-block;
  color: gray;
}
.text{
  font-size: 16px;
}

.highlight{
  color: #FF3333
}
.edit{
  cursor: pointer;
  font-size: 16px;
  color: gray;
}
.delete{
  margin-left: 10px
}
</style>