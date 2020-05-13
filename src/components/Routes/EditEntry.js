import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import EntryForm from '../Shared/EntryForm'
import Layout from '../Shared/Layout'

const EditEntry = (props, match, location, cancelPath) => {
  const [entry, setEntry] = useState({
    title: '',
    description: '',
    user_id: props.user.id,
    date: '',
    url: ''
  })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/entries/${props.match.params.id}`)
      .then(res => setEntry(res.data.entry))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setEntry(collection => ({ ...entry, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/entries/${props.match.params.id}`,
      method: 'PATCH',
      data: { entry }
    })
      .then(() => setUpdated(true))
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/entries/${props.match.params.id}`} />
  }

  return (
    <Layout>
      <EntryForm
        entry={entry}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath='/'
      />
    </Layout>
  )
}

export default EditEntry
