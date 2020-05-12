import React from 'react'

import Header from './Header'

const Layout = props => (
  <div>
    <h1>Submitted Collections</h1>
    <Header />

    {props.children}

  </div>
)

export default Layout
