<template>
  <el-row class="container">
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
      <router-link :to='`/user/${item.author}`' tag="span" class="meta">
        <span class="author">{{item.author}}</span>
      </router-link>
      <span class="date meta">{{time}}</span>
      <span class="readNum meta"  v-if="this.type === 'article'">10次阅读</span>      
    </div>
    <p class="abstract">{{item.content_text}}</p>
    <el-row class="footer" v-if="this.type === 'article'">
      <div class="message">
        <tags :item='item'/>
      </div>
      <div class="votesBox">
        <action :item="item" :is-owner="isOwner"/>
      </div>
    </el-row>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import tags from '../components/Tags.vue'
import action from '../components/Action.vue'

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
  components: {
    tags,
    action
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
  width: 100%;
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
  max-height: 40px;
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
.meta{
  font-size: 1rem;
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
.edit{
  position: absolute;
  right: 10px;
  top: 20px;
  cursor: pointer
}
.author::after,.date::after {
  content: "\B7";
  margin: 0 .4em;
  color: #8f969c;
}
.votesBox,.message {
  display:inline-block
}
.votesBox {
  float: right;
}
  @media screen and (max-width: 600px) {
    .container{
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