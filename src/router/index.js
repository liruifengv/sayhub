import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'

const TagsPage = () => import('../pages/TagsPage.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/tags',
      name: 'TagsPage',
      component: TagsPage
    }
  ]
})
