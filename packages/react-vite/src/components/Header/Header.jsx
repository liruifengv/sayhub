import React from 'react'
import { NavLink } from 'react-router-dom'
import { MenuOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styles from './Header.module.css'

const colors = [
  '#ff80ed',
  '#065535',
  '#ff0000',
  '#008080',
  '#ffc0cb',
  '#b0e0e6',
  '#ffc3a0',
  '#66cdaa',
  '#3399ff',
  '#a0db8e',
  '#808080',
]

const Header = ({ showMenu }) => (
  <div className={styles.header}>
    <NavLink
      className={styles.logo}
      to="/"
      style={{ color: colors[crypto.getRandomValues(new Uint32Array(1))[0] % colors.length] }}
    >
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
