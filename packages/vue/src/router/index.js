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
const UserInfo = () => import('../pages/UserInfo.vue')
const Settings = () => import('../pages/Settings.vue') // 设置页面
const Profile = () => import('../pages/Profile.vue') // 个人信息
const ChangePassword = () => import('../pages/ChangePassword.vue') // 修改密码
const NotFound = () => import('../pages/NotFound.vue') // 修改密码

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 } // 对于所有路由导航，简单地让页面滚动到顶部
  },
  routes: [
    {
      path: '/home',
      name: 'HomePage',
      component: HomePage,
      children: [
        {
          path: ':sort',
          component: ArticleList,
        },
        {
          path: '',
          component: ArticleList,
        },
      ],
    },
    {
      path: '/tags',
      component: TagsPage,
      children: [
        {
          path: ':category',
          component: ArticleList,
        },
        {
          path: '',
          component: ArticleList,
        },
      ],
    },
    {
      path: '/signup',
      name: 'SignIn',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/article/:id',
      name: 'ArticleDeyail',
      component: ArticleDetail,
    },
    {
      path: '/write',
      name: 'ArticleWrite',
      component: ArticleWrite,
    },
    {
      path: '/article/:id/edit',
      name: 'articleEdit',
      component: ArticleWrite,
    },
    {
      path: '/draft/:id/edit',
      name: 'draftEdit',
      component: ArticleWrite,
    },
    {
      path: '/draft',
      name: 'DraftsPage',
      component: DraftsPage,
    },
    {
      path: '/user/:username',
      name: 'UserInfo',
      component: UserInfo,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      children: [
        {
          path: 'profile',
          component: Profile,
        },
        {
          path: 'changepassword',
          component: ChangePassword,
        },
      ],
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
})
