import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

const ShowCollection = (props) => {
  const [collection, setCollection] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // const [collection] = useState(null)

  useEffect(() => {
    axios(`${apiUrl}/collections/${props.match.params.id}`)
      .then(res => setCollection(res.data.collection))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/collections/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!collection) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'collection succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>{collection.name}</h4>
      <p>Date relased: {collection.description}</p>
      <button onClick={destroy}>Delete Collection</button>
      <Link to={`/collections/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/collections">Back to all Collections</Link>
    </Layout>
  )
}

export default ShowCollection
