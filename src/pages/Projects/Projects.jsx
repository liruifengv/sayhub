import React from 'react'
import styles from './Projects.module.css'
import projects from './Projects.json'

const openUrl = url => {
  window.open(url)
}

const Projects = () => (
  <>
    <div className={styles.pagetitle}>Projects</div>
    <div className={styles.pagedescription}>我的项目一览</div>
    <div className={styles.container}>
      {projects.map((item, index) => (
        <div
          className={styles.item}
          aria-hidden="true"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          onClick={() => {
            openUrl(item.link)
          }}
        >
          <div className={styles.title}>{item.title}</div>
          <div className={styles.description}>{item.description}</div>
        </div>
      ))}
    </div>
  </>
)

export default Projects
