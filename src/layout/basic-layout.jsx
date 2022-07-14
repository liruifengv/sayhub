import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { Header } from '@/components'

const BasicLayout = props => {
  const { route } = props

  return (
    <>
      <Header />
      <div className="content">{renderRoutes(route.routes)}</div>
    </>
  )
}

BasicLayout.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  route: PropTypes.object.isRequired,
}

export default BasicLayout
