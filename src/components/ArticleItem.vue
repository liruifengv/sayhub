<template>
  <el-row class="container"  :class=" longWidth === true ? 'long_container' : 'container'">
    <el-row v-if="type === 'article'">
      <router-link :to='`/${this.type}/${item._id}`' tag="p">
        <p class="title">{{item.title}}</p>
      </router-link>
    </el-row>
    <el-row v-else-if="type === 'draft'">
      <router-link :to='`/${this.type}/${item._id}/edit`' tag="p">
        <p class="title">{{item.title}}</p>
      </router-link>
    </el-row>
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
      <span class="author">{{item.author}}</span>
      <span class="date">{{item.updated}}</span>
    </div>
    <p class="abstract">{{item.content_text}}</p>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
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
  },
  methods: {
    toDelete () {
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
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px
}
.abstract{
  margin-top: 9px;
  overflow: hidden;
  font-size: 15px;
  color: #262626;
  text-overflow: ellipsis;
 	display: -webkit-box;
 	-webkit-line-clamp: 3;
 	-webkit-box-orient: vertical;
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