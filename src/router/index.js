import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'

const TagsPage = () => import('../pages/TagsPage.vue')
const SignUp = () => import('../pages/SignUp.vue')
const LogIn = () => import('../pages/LogIn.vue')
const ArticleDetail = () => import('../pages/ArticleDetail.vue')
const ArticleList = () => import('../components/ArticleList.vue')
const ArticleWrite = () => import('../pages/ArticleWrite.vue')
const DraftsPage = () => import('../pages/DraftsPage.vue')

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
        path: ':category',
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
    },
    {
      path: '/article/:id',
      name: 'ArticleDeyail',
      component: ArticleDetail
    },
    {
      path: '/write',
      name: 'ArticleWrite',
      component: ArticleWrite
    },
    {
      path: '/article/:id/edit',
      name: 'articleEdit',
      component: ArticleWrite
    },
    {
      path: '/draft/:id/edit',
      name: 'draftEdit',
      component: ArticleWrite
    },
    {
      path: '/draft',
      name: 'DraftsPage',
      component: DraftsPage
    }
  ]
})
