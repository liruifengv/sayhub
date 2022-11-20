<template>
  <div>
    <header class="header">
      <div class="settingTag">
        <div class="box">
          <router-link to="/settings/profile" tag="span" class="tag" exact>个人资料</router-link>
          <router-link to="/settings/changepassword" tag="span" class="tag">修改密码</router-link>
        </div>
      </div>
    </header>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  methods: {},
}
</script>

<style scoped>
.view {
  position: relative;
  top: 50px;
}
.header {
  position: fixed;
  z-index: 300;
  height: 50px;
  top: 60px;
  left: 0;
  right: 0;
  border-bottom: 1px solid #d9d9d9;
  line-height: 50px;
  background: #000;
}
.settingTab {
  display: inline-block;
}
.tag {
  color: #fff;
  cursor: pointer;
  margin-right: 20px;
}
span.router-link-active {
  color: #42b983;
}
.box {
  position: relative;
  left: 100px;
}
</style>
