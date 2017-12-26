import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'

const TagsPage = () => import('../pages/TagsPage.vue')
const SignUp = () => import('../pages/SignUp.vue')
const LogIn = () => import('../pages/LogIn.vue')
const ArticleList = () => import('../components/ArticleList.vue')

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
      component: TagsPage,
      children: [{
        path: ':tagName',
        component: ArticleList
      },
      {
        path: '',
        component: ArticleList
      }]
    },
    {
      path: '/signup',
      name: 'SignIn',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    }
  ]
})
