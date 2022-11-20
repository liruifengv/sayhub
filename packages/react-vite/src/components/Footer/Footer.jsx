import React from 'react'
import styles from './Footer.module.css'

const Footer = () => (
  <div className={styles.footer}>
    <a className={styles.item} target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index" rel="noreferrer">
      冀ICP备17036505号-1
    </a>
    <div className={styles.item}>©2022 SayHub</div>
  </div>
)

export default Footer
