<template>
  <el-row class="container">
    <el-col :span="12" :xs="24" class="article">
      <h1 class="title">{{ article.title }}</h1>
      <router-link :to="`/user/${article.author}`" tag="span">
        <span class="author">{{ article.author }}</span>
      </router-link>
      <span class="date">发表日期: {{ time }}</span>
      <span class="readNum meta">{{ article.readed_count }}次阅读</span>
      <el-row class="markdown-body">
        <p class="content" v-html="article.content_render"></p>
      </el-row>
      <tags :item="article" />
      <div class="footer">
        <span class="goal" :class="{ highlight: article.is_up }" @click="vote">
          <span class="text"> <i class="mdi mdi-thumb-up-outline"></i> </span>&nbsp;{{ article.votes_count }}
        </span>
        <div class="edit" v-if="isOwner">
          <router-link :to="`/article/${article._id}/edit`" tag="span"> <i class="el-icon-edit"></i> 编辑 </router-link>
          <span @click="toDelete" class="delete"> <i class="el-icon-delete"></i> 删除 </span>
        </div>
      </div>
      <el-row>
        <el-col :span="3" class="comments_count"> {{ comments_count }}条评论 </el-col>
        <el-col :span="21" class="line"></el-col>
      </el-row>
      <el-row class="input_box">
        <el-input
          v-model="comment"
          placeholder="写下你的评论..."
          ref="comment"
          size="large"
          class="input"
          @focus="focus"
        ></el-input>
      </el-row>
      <el-row class="btn">
        <el-button type="text" class="cancel" v-show="btn_show" @click="cancel">取消</el-button>
        <el-button plain v-show="btn_show" @click="toComment()">评论</el-button>
      </el-row>
      <el-row class="comment_box">
        <el-row class="comment_list" v-for="item in comments" :key="item._id">
          <comment-item :comment="item" :getComments="getComments" />
        </el-row>
      </el-row>
      <div class="block" v-show="total > 1">
        <el-pagination
          layout="prev, pager, next"
          :page-count="total"
          @current-change="changePage"
          :current-page.sync="page"
        >
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import CommentItem from '../components/CommentItem.vue'
import tags from '../components/Tags.vue'

export default {
  data() {
    return {
      article: {},
      time: '',
      btn_show: false,
      comments: [],
      comment: '',
      total: 0,
      page: 1,
      comments_count: '',
    }
  },
  components: {
    tags,
    CommentItem,
  },
  computed: {
    ...mapState(['userInfo']),
    isOwner() {
      if (this.userInfo.username) {
        if (this.userInfo.username === this.article.author) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
  },
  created() {
    this.getArticle()
  },
  methods: {
    getArticle() {
      this.$http
        .get(`/article/${this.$route.params.id}`)
        .then((res) => {
          if (res.status === 200) {
            this.article = res.data
            console.log(this.article)
            this.time = moment(this.article.updated).format('YYYY-MM-DD HH:mm:ss')
            this.getComments()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getComments() {
      this.$http
        .get(`/article/${this.$route.params.id}/comments?page=${this.page}&page_size=5`)
        .then((res) => {
          if (res.status === 200) {
            this.comments = res.data.comments
            this.comments_count = res.data.total
            this.total = Math.ceil(res.data.total / 5)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changePage() {
      this.getComments()
    },
    vote() {
      if (this.userInfo.username) {
        if (this.isOwner === false) {
          if (this.article.is_up) {
            this.$http.delete(`/article/${this.article._id}/up`).then((res) => {
              if (res.status === 200) {
                this.article.votes_count = res.data.votes_count
                this.article.is_up = false
              }
            })
          } else {
            this.$http.post(`/article/${this.article._id}/up`).then((res) => {
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
    toDelete() {
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http
            .delete(`/article/${this.article._id}`)
            .then((res) => {
              if (res.status === 200) {
                this.$message.success('删除成功~')
                this.$router.push('/')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    focus() {
      this.btn_show = true
    },
    toComment() {
      if (this.userInfo.username) {
        if (this.comment === '') {
          this.$message.info('评论不能为空~')
        } else {
          this.$http
            .post(`/article/${this.article._id}/comment`, {
              content: this.comment,
              author: this.userInfo.username,
            })
            .then((res) => {
              if (res.status === 200) {
                this.comments_count = res.data.comments_count
                this.getComments()
                this.comment = ''
                this.btn_show = false
              }
            })
        }
      } else {
        this.$message.error('请登录后评论！')
      }
    },
    cancel() {
      this.btn_show = false
    },
  },
}
</script>

<style scoped>
.view {
  background: #fff !important;
}
.container {
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
}
.article {
  padding: 15px;
  box-sizing: border-box;
}
.title {
  word-wrap: break-word;
}
.author,
.date,
.readNum {
  font-size: 15px;
  color: #8590a6;
  margin-right: 10px;
}
.author::after,
.date::after {
  content: '\B7';
  margin: 0 0.4em;
  color: #8f969c;
}
.content {
  padding-top: 10px;
  font-size: 16px;
  text-align: left;
  color: #000;
  line-height: 30px;
}
.markdown-body {
  margin-bottom: 20px;
}
.category {
  margin: 0 16px 16px 0;
  padding: 8px 10px;
  height: 30px;
  line-height: 30px;
  max-width: 100%;
  background: rgba(0, 0, 0, 0.06);
  color: #666768;
  border-radius: 15px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.category:hover {
  background: #d3d3d3;
}
.footer {
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.goal {
  cursor: pointer;
  margin-left: 10px;
  display: inline-block;
  color: gray;
}
.text {
  font-size: 16px;
}

.highlight {
  color: #ff3333;
}
.edit {
  cursor: pointer;
  font-size: 16px;
  color: gray;
}
.delete {
  margin-left: 10px;
}
.comments_count {
  font-size: 14px;
  color: #494949;
  font-weight: bold;
  margin-bottom: 30px;
  margin-top: 30px;
  padding: 10px;
}
.line {
  border-bottom: 1px solid #d9d9d9;
  margin-top: 46px;
}
.input_box {
  display: flex;
  padding: 10px;
}
.input_avatar {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.input {
  margin-left: 10px;
}
.btn {
  float: right;
  margin-right: 20px;
}
.cancel {
  margin-right: 20px;
}
.comment_box {
  margin-top: 50px;
}
.block {
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>
