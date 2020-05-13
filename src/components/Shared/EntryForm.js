import React from 'react'
import { Link } from 'react-router-dom'

const EntryForm = ({ entry, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="Entry Title"
      value={entry.title}
      name="title"
      onChange={handleChange}
    />

    <label>Description</label>
    <input
      placeholder="Description"
      value={entry.description}
      name="description"
      onChange={handleChange}
    />

    <label>Date</label>
    <input
      placeholder="Date"
      value={entry.date}
      name="date"
      onChange={handleChange}
    />

    <label>Url</label>
    <input
      placeholder="url"
      value={entry.url}
      name="url"
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default EntryForm
