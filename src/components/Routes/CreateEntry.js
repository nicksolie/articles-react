import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import EntryForm from '../Shared/EntryForm'
import Layout from '../Shared/Layout'

const CreateEntry = (props) => {
  const [entry, setEntry] = useState({
    title: '',
    description: '',
    user_id: props.user.id,
    date: '',
    url: '',
    collection_id: props.match.params.id
  })

  const [createdEntryId, setCreatedEntryId] = useState(null)

  const handleChange = event => {
    event.persist()
    setEntry(entry => ({ ...entry, [event.target.name]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: apiUrl + '/entries',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: { entry }
    })
      .then(res => setCreatedEntryId(res.data.entry.id))
      .catch(console.error)
  }

  if (createdEntryId) {
    return <Redirect to={`/entries/${createdEntryId}`} />
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

export default CreateEntry
