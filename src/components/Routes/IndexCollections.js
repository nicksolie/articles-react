import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

const IndexCollections = (props) => {
  const [collections, setCollections] = useState([])
  // const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/collections`)
      .then(res => setCollections(res.data.collections))
      .catch(console.error)
  }, [])

  const collectionsJsx = collections.map(collection => (
    <li key={collection.id}>
      <Link to={`/collections/${collection.id}`}>{collection.name}</Link>
    </li>
  ))

  return (
    <div>
      <h1>Collections</h1>
      { collectionsJsx }
    </div>
  )
}

export default IndexCollections
