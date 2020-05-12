import React, { useState } from 'react'
// import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'

// import CollectionForm from '../Shared/CollectionForm'
// import Layout from '../Shared/Layout'

const CreateCollection = (props, cancelPath) => {
  console.log(props)
  const [collection, setCollection] = useState({
    name: '',
    description: ''
  })

  // const [createdCollectionId, setCreatedCollectionId] = useState(null)
  const [setCreatedCollectionId] = useState(null)

  const handleChange = event => {
    event.persist()
    setCollection(collection => ({ ...collection, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: apiUrl + '/collecctions',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { collection }
    })
      .then(res => setCreatedCollectionId(res.data.collection.id))
      .catch(console.error)
  }

  // if (createdCollectionId) {
  //   return <Redirect to={'/collections'} />
  // }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          placeholder="Collection Name"
          value={collection.name}
          name="name"
          onChange={handleChange}
        />

        <label>Description</label>
        <input
          placeholder="Description"
          value={collection.description}
          name="description"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        <Link to={cancelPath}>
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  )
}
// <Layout>
//   <CollectionForm
//     collection={collection}
//     handleChange={handleChange}
//     handleSubmit={handleSubmit}
//     cancelPath='/'
//   />
// </Layout>

export default CreateCollection
