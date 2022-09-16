import React, { Suspense, useState } from 'react'
import { Header } from '@/components'
import { useNavigate } from 'react-router-dom'
import AppRoutes from './router'

function App() {
  const [show, setShow] = useState(false)
  const navigateTo = useNavigate()

  const goRoute = url => {
    setShow(false)
    navigateTo(url)
  }

  return (
    <>
      <Header showMenu={() => setShow(!show)} />
      <Suspense>
        {show && (
          <div className="menu">
            <div
              className="menu-item"
              aria-hidden="true"
              onClick={() => {
                goRoute('/articles')
              }}
            >
              我的文章
            </div>
            <div
              className="menu-item"
              aria-hidden="true"
              onClick={() => {
                goRoute('/projects')
              }}
            >
              我的项目
            </div>
            <a
              href="https://github.com/liruifengv"
              target="_blank"
              rel="noreferrer"
              className="menu-item"
              onClick={() => setShow(false)}
            >
              GitHub
            </a>
          </div>
        )}
        <AppRoutes />
      </Suspense>
    </>
  )
}

export default App
