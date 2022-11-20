import React from 'react'
import styles from './Articles.module.css'
import articles from './Articles.json'

const openUrl = (url) => {
  window.open(url)
}

const Articles = () => (
  <>
    <div className={styles.pagetitle}>Articles</div>
    <div className={styles.pagedescription}>我的文章一览</div>
    <div className={styles.container}>
      {articles.map((item, index) => (
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
          <div className={styles.time}>{item.time}</div>
        </div>
      ))}
    </div>
  </>
)

export default Articles
