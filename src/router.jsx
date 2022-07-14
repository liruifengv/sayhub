import React from 'react'
import { Redirect } from 'react-router-dom'

const BasicLayout = React.lazy(() => import('@/layout/basic-layout.jsx'))
const Home = React.lazy(() => import('@/pages/Home/Home.jsx'))
const Articles = React.lazy(() => import('@/pages/Articles/Articles.jsx'))
const Projects = React.lazy(() => import('@/pages/Projects/Projects.jsx'))
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound.jsx'))

const routes = [
  {
    path: '/',
    component: BasicLayout,
    routes: [
      { path: '/404', component: NotFound },
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/articles',
        component: Articles,
      },
      {
        path: '/projects',
        component: Projects,
      },
      { path: '*', render: () => <Redirect to="/404" /> },
    ],
  },
  { path: '*', render: () => <Redirect to="/404" /> },
]

export default routes
