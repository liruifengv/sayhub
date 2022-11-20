<template>
  <el-row class="wrapper">
    <div class="author_box">
      <router-link :to="`/user/${comment.author}`" tag="span">
        <span class="author">{{ comment.author }}</span>
      </router-link>
      <span class="date">{{ time }}</span>
    </div>
    <div class="content">{{ comment.content }}</div>
    <div class="edit" v-if="isOwner">
      <el-dropdown trigger="click">
        <i class="el-icon-arrow-down"></i>
        <el-dropdown-menu slot="dropdown" class="menu">
          <span @click="toDelete">
            <el-dropdown-item> <i class="el-icon-delete"></i> 删除 </el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row class="votes_box">
      <span class="goal" :class="{ highlight: is_up }" @click="vote">
        <span class="text"> <i class="mdi mdi-thumb-up-outline"></i> </span>&nbsp;{{ comment.votes_count }}
      </span>
    </el-row>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      time: '',
      is_up: false,
    }
  },
  props: {
    comment: {
      type: Object,
    },
    getComments: {
      type: Function,
    },
  },
  computed: {
    ...mapState(['userInfo']),
    isOwner() {
      if (this.userInfo.username) {
        if (this.userInfo.username === this.comment.author) {
          return true
        } else {
          return false
        }
      }
    },
  },
  created() {
    this.time = moment(this.comment.created).format('YYYY-MM-DD HH:mm:ss')
    if (this.userInfo._id) {
      if (this.comment.votes.includes(this.userInfo._id)) {
        this.is_up = true
      } else {
        this.is_up = false
      }
    } else {
      this.is_up = false
    }
  },
  methods: {
    toDelete() {
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$http
            .delete(`/comment/${this.comment._id}`)
            .then((res) => {
              if (res.status === 200) {
                this.$message.success('删除成功~')
                this.getComments()
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
    vote() {
      if (this.userInfo.username) {
        if (this.isOwner === false) {
          if (this.is_up) {
            this.$http.delete(`/comment/${this.comment._id}/up`).then((res) => {
              if (res.status === 200) {
                this.comment.votes_count = res.data.votes_count
                this.is_up = false
              }
            })
          } else {
            this.$http.post(`/comment/${this.comment._id}/up`).then((res) => {
              if (res.status === 200) {
                this.comment.votes_count = res.data.votes_count
                this.is_up = true
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
  },
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  border-bottom: 1px solid #e1e4e8;
  padding: 15px;
}
.content {
  color: #262626;
  line-height: 20px;
  cursor: auto;
  margin-top: 10px;
}

.author,
.date {
  font-size: 16px;
  color: #8590a6;
}
.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
.author {
  cursor: pointer;
}
.author:hover {
  color: #42b983;
}
.date {
  margin-left: 10px;
}
.edit {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.votes_box {
  margin-top: 10px;
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
</style>
