<template>
  <div class="Box">
    <span class="votes"  :class="{highlight: item.is_up}" @click="vote">
      <span class="text">
        <i class="mdi mdi-thumb-up-outline"></i>
      </span>&nbsp;{{item.votes_count}}
    </span>
    <router-link :to="`/article/${this.item._id}`" tag="span" class="comments">
      <span class="text">
        <i class="mdi mdi-comment-processing-outline"></i>
      </span>&nbsp;{{item.comments_count}}
    </router-link>      
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      votes_count: '',
      comments_count: ''
    }
  },
  props: {
    item: {
      type: Object
    },
    isOwner: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created () {
  },
  methods: {
    vote () {
      if (this.userInfo.username) {
        if (this.isOwner === false) {
          if (this.item.is_up) {
            this.$http.delete(`/article/${this.item._id}/up`)
              .then(res => {
                if (res.status === 200) {
                  this.item.votes_count = res.data.votes_count
                  this.item.is_up = false
                }
              })
          } else {
            this.$http.post(`/article/${this.item._id}/up`)
              .then(res => {
                if (res.status === 200) {
                  this.item.votes_count = res.data.votes_count
                  this.item.is_up = true
                }
              })
          }
        } else {
          this.$message.error('不能给自己点赞！')
        }
      } else {
        this.$message.error('请登录后点赞！')
      }
    }
  }
}
</script>

<style scoped>
.Box {
  display: flex;
  justify-content: flex-start;
}
.votes,.comments{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    padding: 0 .8rem;
    height: 2rem;
    font-size: 1.083rem;
    line-height: 1;
    white-space: nowrap;
    color: #42b983;
    border-radius: 1px;
    border: 1px solid #42b983;
    cursor: pointer;
}
.text{
  font-size: 16px;
}
.highlight{
  color: #FF3333
}
</style>