import React from 'react'
import styles from './Home.module.css'
import welcome from '../../static/welcome.svg'

const Home = () => (
  <div>
    <div className={styles.welcome}>
      <div className={styles.left}>
        <h1>Welcome to SayHub</h1>
        <div>Homepage of liruifeng</div>
      </div>
      <img src={welcome} alt="Welcome" />
    </div>
  </div>
)

export default Home
