import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'

const TagsPage = () => import('../pages/TagsPage.vue')
const SignIn = () => import('../pages/SignIn.vue')
const LogIn = () => import('../pages/LogIn.vue')

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
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    }
  ]
})
