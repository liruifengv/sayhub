import React, { Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './router'

function App() {
  // base 仅仅是为了 github-pages，部署到自己网站时不需要，要注释掉。想想怎么自动化处理
  const basename = process.env.NODE_ENV === 'development' ? '' : '/sayhub/'
  return (
    <Router basename={basename}>
      <Suspense>{renderRoutes(routes)}</Suspense>
    </Router>
  )
}

export default App
