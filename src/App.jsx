import React, { Suspense } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <Router>
      <Suspense>{renderRoutes(routes)}</Suspense>
    </Router>
  )
}

export default App
