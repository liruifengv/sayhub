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
        Articles
      </NavLink>
      <NavLink className={styles.item} to="/Projects" activeClassName={styles.active}>
        Projects
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
