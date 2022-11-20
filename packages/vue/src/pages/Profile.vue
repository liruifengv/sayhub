<template>
  <el-row>
    <div class="container">
      <div class="row">
        <div class="box">
          <h1>修改资料</h1>
          <ul class="account-list">
            <li class="item">
              <div class="title">
                <span>个性签名</span>
              </div>
              <div class="input-box">
                <input class="input" type="text" v-model="user.bio" placeholder="请输入个性签名" />
              </div>
            </li>
            <li class="item">
              <div class="title">
                <span>邮箱</span>
              </div>
              <div class="input-box">
                <input class="input" type="text" v-model="user.email" placeholder="请输入邮箱" />
              </div>
            </li>
            <li class="item">
              <div class="title">
                <span>公司</span>
              </div>
              <div class="input-box">
                <input class="input" type="text" v-model="user.company" placeholder="请输入公司" />
              </div>
            </li>
            <li class="item">
              <div class="title">
                <span>github</span>
              </div>
              <div class="input-box">
                <input class="input" type="text" v-model="user.github" placeholder="请输入github" />
              </div>
            </li>

            <li class="item">
              <div class="title">
                <span>个人主页</span>
              </div>
              <div class="input-box">
                <input class="input" type="text" v-model="user.homepage" placeholder="请输入个人主页" />
              </div>
            </li>
          </ul>
          <el-button type="primary" size="large" class="save" @click="save">保存修改</el-button>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      user: {
        bio: '',
        email: '',
        company: '',
        github: '',
        homepage: '',
      },
    }
  },
  created() {
    this.initData()
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    initData() {
      this.user.bio = this.userInfo.bio
      this.user.email = this.userInfo.email
      this.user.company = this.userInfo.company
      this.user.github = this.userInfo.github
      this.user.homepage = this.userInfo.homepage
    },
    save() {
      this.$http
        .post(`/profile`, {
          bio: this.user.bio,
          email: this.user.email,
          company: this.user.company,
          github: this.user.github,
          homepage: this.user.homepage,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$message.success('修改成功~')
          }
        })
        .catch((error) => {
          this.$message.error(error.response.data.detail)
        })
    },
  },
}
</script>

<style scoped>
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 580px;
  margin-top: 60px;
}
.row {
  width: 820px;
  height: 500px;
  background: rgba(22, 27, 32);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  padding: 30px;
  color: #42b983;
  border-radius: 3px;
}
.item {
  line-height: 70px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: space-between;
}
.box {
  margin-left: -30px;
}
.box h1 {
  position: relative;
  left: 40px;
  font-size: 22px;
}
.input-box {
  width: 80%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
}
.action-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
}
.input {
  margin-right: 10px;
  border: none;
  outline: none;
  color: #42b983;
  width: 500px;
  height: 30px;
  font-size: 16px;
  background-color: #000;
}
.save {
  float: right;
  font-size: 16px;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #d9d9d9;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #d9d9d9;
  opacity: 1;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #d9d9d9;
  opacity: 1;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #d9d9d9;
}
@media screen and (max-width: 600px) {
  .view {
    background: #fff;
    margin-top: 10px;
  }
  .container {
    width: 95%;
    height: 100%;
  }
  .row {
    padding: 20px;
    width: 100%;
    box-shadow: none;
    box-sizing: border-box;
  }
  .item {
    line-height: 40px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .input-box {
    width: 100%;
    justify-content: space-between;
  }
  .box {
    margin-left: -15px;
  }
}
</style>
