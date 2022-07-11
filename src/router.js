import React from 'react'
import { Redirect } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/Home/Home'))

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  { path: '*', render: () => <Redirect to="/404" /> },
]

export default routes
