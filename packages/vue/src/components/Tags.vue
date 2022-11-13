<template>
  <div>
    <span class="tags">
      <router-link v-for="(tag,index) in item.category" :key="index" :to='`/tags/${tag}`' class="tag" :class='tag' tag="span">{{tag}}</router-link>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.tag {
  display: inline-block;
  margin: 0.2rem 0.8rem 0.2rem 0;
  padding: .38rem;
  min-width: 3.5rem;
  text-align: center;
  line-height: 1;
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
  font-size: 14px;
}
.front_end {
  background-color: #abbb79;
}
.JavaScript {
  background-color: #56c4e1;
}
.CSS {
  background-color: #857dea;
}
.Vue {
  background-color: #42b983;
}
.React {
  background-color: #108ee9;
}
.wechat {
  background-color: #42c67d;
}
</style>