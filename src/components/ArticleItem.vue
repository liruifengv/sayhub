<template>
  <el-row class="container">
    <p class="title">文章标题</p>
    <p class="abstract">文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要
    文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要文章摘要</p>
    <div class="flex-box">
    <div class="author-box">
      <img src="../assets/avatar.jpg" class="avatar"/>
      <span class="author">lirufiengv</span>
    </div>
      <p class="date">2017-12-25</p>
    </div>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
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
  padding: 0 10px 0 10px
}
.title{
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
.abstract{
  margin-top: 9px;
  margin-bottom: -4px;
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
.flex-box{
  display: flex;
  justify-content: space-between
}
.avatar{
  width:20px;
  height:20px;
  border-radius: 50%
}
.author-box{
  margin-top:10px;
  cursor: pointer;
}
</style>