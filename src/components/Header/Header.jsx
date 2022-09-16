import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styles from './Header.module.css'

const Header = ({ showMenu }) => (
  <div className={styles.header}>
    <NavLink className={styles.logo} to="/">
      Sayhub
    </NavLink>
    <div className={styles.nav}>
      <NavLink className={styles.item} to="/articles" activeclassname={styles.active}>
        我的文章
      </NavLink>
      <NavLink className={styles.item} to="/projects" activeclassname={styles.active}>
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
    <MenuOutlined className={styles.menu} onClick={showMenu} />
  </div>
)

Header.propTypes = {
  showMenu: PropTypes.func.isRequired,
}

export default Header
