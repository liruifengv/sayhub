<template>
  <el-row class="container">
    <div class="right">
      <span class="tip">草稿自动保存至<router-link tag="span" to='/draft' class="draft">草稿箱</router-link></span>
      <el-button round  @click="dialogVisible = true" v-if="type === 'write'">发布</el-button>
      <el-button round  @click="dialogVisible = true" v-else>保存</el-button>      
    </div>
    <el-col :span="12" :xs="24" class="write">
      <input v-model="title" placeholder="请输入标题" class="title" />
        <mavon-editor id="editor" v-model="content" :subfield="false" :toolbars="toolbars" :default_open='`edit`' />
    </el-col>
    <el-dialog title="发布文章" :visible.sync="dialogVisible">
      <p>选择文章所属类型</p>
      <el-checkbox-group v-model="category" class="tagCategory">
        <el-checkbox label="front_end" name="front_end">前端</el-checkbox>
        <el-checkbox label="JavaScript" name="JavaScript">JavaScript</el-checkbox>
        <el-checkbox label="CSS" name="CSS">CSS</el-checkbox>
        <el-checkbox label="Vue" name="Vue">Vue</el-checkbox>
        <el-checkbox label="wechat" name="wechat">微信公众号</el-checkbox>
        <el-checkbox label="React" name="React">React</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="publishArticle" v-if="type === 'write'">确认发布</el-button>
        <el-button type="primary" @click="saveEdit" v-else>保存修改</el-button>        
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import Item from '../components/LoginItem'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        title: '',
        content: '',
        dialogVisible: false,
        category: []
      }
    },
    props: {
      toolbars: {
        type: Object,
        default () {
          return {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            code: true, // code
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            help: true, // 帮助
            subfield: true, // 单双栏模式
            preview: true // 预览
          }
        }
      }
    },
    components: {
      Item
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
      type () {
        if (this.$route.path.includes('edit')) {
          return 'edit'
        } else {
          return 'write'
        }
      }
    },
    beforeCreate () {
      if (!window.localStorage.getItem('sayhub_token')) {
        this.$message.warning('请先登录~~')
        this.$router.push({ path: '/login' })
      }
    },
    created () {
      this.$store.commit('SHOW_NAV', false)
      if (this.$route.path.includes('edit')) {
        this.$http.get(`/article/${this.$route.params.id}/`)
        .then(res => {
          if (res.status === 200) {
            this.title = res.data.title
            this.content = res.data.content
            this.category = res.data.category
          }
        })
      }
    },
    destroyed () {
      this.$store.commit('SHOW_NAV', true)
    },
    methods: {
      publishArticle () {
        if (this.title === '') {
          this.$message.warning('文章标题不能为空哦~~')
        } else if (this.content === '') {
          this.$message.warning('文章内容不能为空哦~~')
        } else if (this.category.length === 0) {
          this.$message.warning('文章类型必选哦~~')
        } else {
          this.$http.post(`/articles`, {
            title: this.title,
            content: this.content,
            author: this.userInfo.username,
            category: this.category
          })
            .then(res => {
              if (res.status === 200) {
                this.dialogVisible = false
                this.$message.success('文章发布成功~~')
                this.$router.push(`/article/${res.data.id}`)
              }
            })
            .catch((error) => {
              console.log(error.response.data.content)
            })
        }
      },
      saveEdit (formName) {
        if (this.title === '') {
          this.$message.warning('文章标题不能为空哦~~')
        } else if (this.content === '') {
          this.$message.warning('文章内容不能为空哦~~')
        } else if (this.category.length === 0) {
          this.$message.warning('文章类型必选哦~~')
        } else {
          this.$http.put(`/article/${this.$route.params.id}`, {
            title: this.title,
            content: this.content,
            author: this.userInfo.username,
            category: this.category
          })
          .then(res => {
            if (res.status === 200) {
              this.dialogVisible = false
              this.$message.success('修改成功')
              this.$router.push(`/article/${res.data.id}`)
            }
          })
          .catch((error) => {
            console.log(error.response.data.content)
          })
        }
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    border: 1px solid #fff;
    top: 0px
  }
  .right{
    position: fixed;
    right: 30px;
    top: 10px
  }
  .tip{
    font-size: 16px;
    color:#d9d9d9;
    margin-right: 10px
  }
  .draft{
    color: #42b983;
    cursor: pointer;
    margin-left: 5px
  }
  .title {
    border: none;
    outline: none;
    width: 100%;
    height: 50px;
    font-size: 32px;
    line-height: 1.4;
    font-weight: 600;
    margin-top: 20px;
    border-bottom: 1px solid #e7eaf1;
    padding-bottom: 10px;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #d9d9d9;
    font-size: 32px;
    line-height: 1.4;
    font-weight: 600;
  }
  
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #d9d9d9;
    opacity: 1;
    font-size: 32px;
    line-height: 1.4;
    font-weight: 600;
  }
  
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #d9d9d9;
    opacity: 1;
    font-size: 32px;
    line-height: 1.4;
    font-weight: 600;
  }
  
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #d9d9d9;
    font-size: 32px;
    line-height: 1.4;
    font-weight: 600;
  }
  #editor{
    height: 100%;
    z-index: 500;
  }
  @media screen and (max-width: 600px) {
    .write{
      padding: 10px;
      margin-top: 20px
      }
    .tip {
      display: none
    }
  }
</style>