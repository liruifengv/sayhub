import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => (
  <div className={styles.header}>
    <NavLink className={styles.logo} to="/">
      Sayhub
    </NavLink>
    <div className={styles.nav}>
      <NavLink className={styles.item} to="/articles" activeClassName={styles.active}>
        我的文章
      </NavLink>
      <NavLink className={styles.item} to="/Projects" activeClassName={styles.active}>
        我的项目
      </NavLink>
      <a
        href="https://github.com/liruifengv"
        className={styles.item}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
    </div>
  </div>
)

export default Header
