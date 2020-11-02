import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'

const IndexCollections = () => {
  const [collections, setCollections] = useState([])

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

  if (!collections) {
    return <p>Loading...</p>
  }
  return (
    <div>
      <h1>Collections</h1>
      <p>Collections and Entries are currently not connected to queries. Please wait for future versions! Oops!</p>
      { collectionsJsx }
    </div>
  )
}

export default IndexCollections
