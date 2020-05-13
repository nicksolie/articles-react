import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../Shared/Layout'

const ShowEntry = (props) => {
  const [entry, setEntry] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/entries/${props.match.params.id}`)
      .then(res => setEntry(res.data.entry))
      .catch(console.error)
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/entries/${props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => setDeleted(true))
      .catch(console.error)
  }

  if (!entry) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/entries', state: { msg: 'entry succesfully deleted!' } }
    } />
  }

  console.log('ShowEntry props are:', props)
  console.log('entry:', entry)

  return (
    <Layout>
      <h4>{entry.name}</h4>
      <p>Date relased: {entry.description}</p>
      <button onClick={destroy}>Delete Entry</button>
      <Link to={`/entries/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/entries">Back to all entries</Link>
    </Layout>
  )
}

export default ShowEntry
