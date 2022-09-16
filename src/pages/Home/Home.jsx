import React from 'react'
import { Button } from 'antd'
import { GithubOutlined, PushpinOutlined, ReadOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import styles from './Home.module.css'
import welcome from '../../assets/welcome.svg'

const clickMe = () => {
  alert('Welcome 👏🏻 (>^ω^<)')
}

const goGithub = () => {
  window.open('https://github.com/liruifengv')
}

const Home = () => {
  const history = useHistory()

  const goRoute = url => {
    history.push(url)
  }

  return (
    <div>
      <div className={styles.welcome}>
        <div className={styles.left}>
          <h1>欢迎来到 liruifengv 的博客</h1>
          <Button
            type="primary"
            className={styles.btn}
            icon={<ReadOutlined />}
            onClick={() => {
              goRoute('/articles')
            }}
          >
            阅读我的文章
          </Button>

          <Button
            className={styles.btn}
            icon={<PushpinOutlined />}
            onClick={() => {
              goRoute('/projects')
            }}
          >
            查看我的项目
          </Button>
          <Button
            type="primary"
            className={styles.btn}
            ghost
            icon={<GithubOutlined />}
            onClick={goGithub}
          >
            我的 Github
          </Button>
        </div>
        <img
          src={welcome}
          alt="Welcome"
          aria-hidden="true"
          onClick={() => {
            clickMe()
          }}
        />
      </div>
    </div>
  )
}

export default Home
