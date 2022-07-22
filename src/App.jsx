import React, { Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './router'

function App() {
  console.log('import.meta:', import.meta)
  const basename = import.meta.env.VITE_GITHUB_CI ? '/sayhub/' : ''
  return (
    <Router basename={basename}>
      <Suspense>{renderRoutes(routes)}</Suspense>
    </Router>
  )
}

export default App
