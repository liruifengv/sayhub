<template>
  <el-row class="wrapper">
    <div class="author_box">
      <span class="author">liruifengv</span>
      <span class="date">2018-03-23</span>
    </div>
    <div class="content">这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论这是一条评论</div>
    <div class="edit">
      <el-dropdown trigger="click">
        <i class="el-icon-arrow-down"></i>
          <el-dropdown-menu slot="dropdown" class="menu">
            <span @click="toDelete">
              <el-dropdown-item>
                <i class="el-icon-delete"></i> 删除
              </el-dropdown-item>
            </span>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row class="votes_box">
     <span class="goal" :class="{highlight: is_up}" @click="vote">
        <span class="text">
          <i class="mdi mdi-thumb-up-outline"></i>
        </span>&nbsp;{{votes_count}}
      </span>
    </el-row>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
// import moment from 'moment'
export default {
  data () {
    return {
      time: '',
      isOwner: true,
      votes_count: 0,
      is_up: false
    }
  },
  props: {
    comments: {
      type: Array
    },
    getComments: {
      type: Function
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
    // isOwner () {
    //   if (this.userInfo) {
    //     if (this.userInfo.username === this.item.author) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // }
  },
  created () {
    // this.time = moment(this.item.updated).format('YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    toDelete () {
      this.$confirm('确认要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`/${this.type}/${this.item._id}`)
          .then(res => {
            if (res.status === 200) {
              this.$message.success('删除成功~')
              if (this.type === 'draft') {
                this.getDrafts()
              } else {
                this.getArticles()
              }
            }
          }).catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    vote () {
      if (this.is_up == true) {
        this.votes_count--
        this.is_up = !this.is_up
      } else {
        this.is_up = !this.is_up
        this.votes_count++
      }
    }
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  border-bottom: 1px solid #e1e4e8;
  padding:15px;
}
.content{
  color: #262626;
  line-height: 20px;
  cursor:auto;
  margin-top: 10px;
}

.author,.date{
  font-size: 16px;
  color: #8590a6;
}
.avatar{
  width:20px;
  height:20px;
  border-radius: 50%
}
.author{
  cursor: pointer;
}
.author:hover{
  color: #42b983;
}
.date {
  margin-left: 10px
}
.edit{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer
}
.votes_box{
  margin-top: 10px;
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
</style>