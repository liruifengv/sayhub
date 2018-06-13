<template>
  <el-row class="contain">
    <el-col  :span="12" :xs="24" class="row">
      <div v-for="(item,index) in drafts" :key="index">
        <Item :item="item" class="draftItem" :key="item._id" :type="'draft'" :getDrafts = "getDrafts"/>        
      </div>
      <div v-show="drafts.length === 0" class="no_drafts">
        <img src="../../static/create.png"/>
        <div>暂无草稿</div>
      </div>
      <div class="block" v-show="total > 1">
        <el-pagination
          layout="prev, pager, next"
          :page-count="total"
          @current-change="changePage"
          :current-page.sync="page">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import Item from '../components/ArticleItem.vue'
  
  export default {
    name: 'DraftsPage',
    data () {
      return {
        drafts: [],
        total: 0,
        page: 1
      }
    },
    components: {
      Item
    },
    created () {
      // console.log('标签页加载成功')
      this.getDrafts()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route () {
        this.getDrafts()
        this.page = 1
      }
    },
    methods: {
      getDrafts () {
        this.$http.get(`/drafts?page=${this.page}&page_size=5`)
          .then(res => {
            if (res.status === 200) {
              this.drafts = res.data.drafts
              this.total = Math.ceil(res.data.total / 5)
            }
          })
      },
      changePage () {
        this.getDrafts()
      }
    }
  }
</script>

<style scoped>
  .contain{
    display: flex;
    justify-content: center
  }
  .no_drafts{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20%;
  }
  .block{
    text-align: center;
    margin-bottom: 20px;
    margin-top: 10px
  }
  .draftItem{
    /* margin-top: 20px; */
    margin: 20px 5px 10px 0px;
    box-shadow: 0 1px 3px 0 rgba(0,34,77,.1);
    background: #fff;
  }
</style>
