import React from 'react'
import { Link } from 'react-router-dom'

const CollectionForm = ({ collection, handleSubmit, handleChange, cancelPath }) => (
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
)

export default CollectionForm
