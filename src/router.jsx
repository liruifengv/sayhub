import React from 'react'
import { Redirect } from 'react-router-dom'

const BasicLayout = React.lazy(() => import('@/layout/basic-layout.jsx'))
const Home = React.lazy(() => import('@/pages/Home/Home.jsx'))
const NotFound = React.lazy(() => import('@/pages/not-found/not-found.jsx'))

const routes = [
  {
    path: '/',
    component: BasicLayout,
    routes: [
      { path: '/404', component: NotFound },
      {
        path: '/',
        exact: true,
        render: () => <Redirect to="/home" />,
      },
      {
        path: '/home',
        component: Home,
      },
    ],
  },
  { path: '*', render: () => <Redirect to="/404" /> },
]

export default routes
