import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import CollectionForm from '../Shared/CollectionForm'
import Layout from '../Shared/Layout'

const CreateCollection = (props, cancelPath) => {
  const [collection, setCollection] = useState({
    name: '',
    description: '',
    user_id: props.user.id
  })

  const [createdCollectionId, setCreatedCollectionId] = useState(null)
  // const [setCreatedCollectionId] = useState(null)

  const handleChange = event => {
    event.persist()
    setCollection(collection => ({ ...collection, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: apiUrl + '/collections',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { collection }
    })
      .then(res => setCreatedCollectionId(res.data.collection.id))
      .catch(console.error)
  }

  if (createdCollectionId) {
    return <Redirect to={`/collections/${createdCollectionId}`} />
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
//
// <div>
//   <form onSubmit={handleSubmit}>
//     <label>Name</label>
//     <input
//       placeholder="Collection Name"
//       value={collection.name}
//       name="name"
//       onChange={handleChange}
//     />
//
//     <label>Description</label>
//     <input
//       placeholder="Description"
//       value={collection.description}
//       name="description"
//       onChange={handleChange}
//     />
//
//     <button type="submit">Submit</button>
//     <Link to={cancelPath}>
//       <button>Cancel</button>
//     </Link>
//   </form>
// </div>

export default CreateCollection
