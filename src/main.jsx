import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

const basename = import.meta.env.VITE_GITHUB_CI ? '/sayhub/' : ''

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </React.StrictMode>,
)
