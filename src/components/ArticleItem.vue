<template>
  <el-row class="container"  :class=" type === 'tags' ? 'tags_container' : 'container'">
    <p class="title">{{article.title}}</p>
    <div class="author_box">
      <span class="author">{{article.author}}</span>
      <span class="date">{{article.created}}</span>
    </div>
    <p class="abstract">{{article.abstract}}</p>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    article: {
      type: Object
    },
    type: {
      type: String
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
.container{
  width: 359px;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
  padding: 0 10px 5px 10px
}
.tags_container{
  width: 800px;
  border: 1px solid #e1e4e8;
  border-radius: 3px;
  padding: 0 10px 5px 10px
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
</style>