import React from 'react'
import NotFoundImg from '../../assets/404.svg'
import { container, img } from './NotFound.module.css'

const clickMe = () => {
  alert('我走丢了(╥╯^╰╥)')
}

const NotFound = () => (
  <div className={container}>
    <img
      title="点我"
      className={img}
      src={NotFoundImg}
      alt="404"
      aria-hidden="true"
      onClick={() => {
        clickMe()
      }}
    />
  </div>
)

export default NotFound
