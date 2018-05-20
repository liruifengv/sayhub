<template>
  <el-row class="container"  :class=" longWidth === true ? 'long_container' : 'container'">
      <router-link :to='`/${this.type}/${item._id}`' class="title" v-if="type === 'article'">
        {{item.title}}
      </router-link>
      <router-link :to='`/${this.type}/${item._id}/edit`' class="title"  v-else-if="type === 'draft'">
        {{item.title === '' ? '未命名草稿' : item.title}}
      </router-link>
    <div class="edit">
      <el-dropdown trigger="click"  v-if="isOwner" >
        <i class="el-icon-arrow-down"></i>
          <el-dropdown-menu slot="dropdown" class="menu">
            <span>
              <el-dropdown-item>
                <router-link :to='`/${this.type}/${item._id}/edit`' tag="span">
                  <i class="el-icon-edit"></i> 编辑
                </router-link>
              </el-dropdown-item>
            </span>
            <span @click="toDelete">
              <el-dropdown-item>
                <i class="el-icon-delete"></i> 删除
              </el-dropdown-item>
            </span>
          </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="author_box">
      <router-link :to='`user/${item.author}`' tag="span">
      <span class="author">{{item.author}}</span>
      </router-link>
      <span class="date">{{time}}</span>
    </div>
    <p class="abstract">{{item.content_text}}</p>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      time: ''
    }
  },
  props: {
    longWidth: {
      type: Boolean
    },
    item: {
      type: Object
    },
    type: {
      type: String,
      default: 'article'
    },
    getArticles: {
      type: Function
    },
    getDrafts: {
      type: Function
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ]),
    isOwner () {
      if (this.userInfo) {
        if (this.userInfo.username === this.item.author) {
          return true
        } else {
          return false
        }
      }
    }
  },
  created () {
    this.time = moment(this.item.updated).format('YYYY-MM-DD HH:mm:ss')
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
    }
  }
}
</script>

<style scoped>
.container{
  width: 48%;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
  padding: 0 15px 5px 15px
}
.long_container{
  width: 100%;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
  padding: 0 15px 5px 15px
}
.title{
  color: #000;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin: 16px 16px 16px 0;
  overflow: hidden;
  text-overflow: ellipsis;
 	display: -webkit-box;
 	-webkit-line-clamp: 2;
 	-webkit-box-orient: vertical;
  text-decoration: none;
  word-wrap:break-word
}

.title:hover {
  color: #42b983
}
.abstract{
  color: #262626;
  line-height: 20px;
  max-height: 60px;
  font-size: 15px;
  margin-top: 9px;
  overflow: hidden;
  cursor:auto;
  position: relative;
}
.abstract:after {
    content:"...";
    position:absolute;
    bottom:0;
    background:#FFF;
    padding-left:0.2em;
    background:url(http://css88.b0.upaiyun.com/css88/2014/09/ellipsis_bg.png) repeat-y;
}
.author,.date{
  font-size: 14px;
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
  top: 20px;
  cursor: pointer
}
  @media screen and (max-width: 600px) {
    .container,.long_container{
      width: 100%;
      border-bottom: 1px solid #e1e4e8;
      border-top: 1px solid #e1e4e8;
      border-left: none;    
      border-right: none;          
      border-radius: 0px;
      padding: 0 15px 5px 15px
    }
  }
</style>