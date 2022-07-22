import React from 'react'
import styles from './Home.module.css'
import welcome from '../../assets/welcome.svg'

const clickMe = () => {
  alert('Welcome 👏🏻 (>^ω^<)')
}

const Home = () => (
  <div>
    <div className={styles.welcome}>
      <div className={styles.left}>
        <h1>Welcome to SayHub</h1>
        <div>Homepage of liruifeng</div>
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

export default Home
