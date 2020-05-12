import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CollectionForm from '../Shared/CollectionForm'
import Layout from '../Shared/Layout'

const EditCollection = (props) => {
  const [collection, setCollection] = useState({
    name: '',
    description: '',
    user_id: props.user.id
  })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/collections/${props.match.params.id}`)
      .then(res => setCollection(res.data.collection))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setCollection(collection => ({ ...collection, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/collections/${props.match.params.id}`,
      method: 'PATCH',
      data: { collection }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/collections/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <CollectionForm
        collection={collection}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    </Layout>
  )
}

export default EditCollection
