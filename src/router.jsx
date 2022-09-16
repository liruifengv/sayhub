import React from 'react'
import { useRoutes } from 'react-router-dom'

const Home = React.lazy(() => import('@/pages/Home/Home.jsx'))
const Articles = React.lazy(() => import('@/pages/Articles/Articles.jsx'))
const Projects = React.lazy(() => import('@/pages/Projects/Projects.jsx'))
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound.jsx'))

const AppRoutes = () => {
  const routers = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'articles',
      element: <Articles />,
    },
    {
      path: 'projects',
      element: <Projects />,
    },
    {
      path: '404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]
  const elements = useRoutes(routers)
  return <>{elements}</>
}

export default AppRoutes
