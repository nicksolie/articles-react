import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const IndexEntries = () => {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    axios(`${apiUrl}/entries`)
      .then(res => setEntries(res.data.entries))
      .catch(console.error)
  }, [])

  const entriesJsx = entries.map(entry => (
    <li key={entry.id}>
      <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
    </li>
  ))

  return (
    <div>
      <h1>Entries</h1>
      <p>Collections and Entries are currently not connected to queries. Please wait for future versions! Oops!</p>
      { entriesJsx }
    </div>
  )
}

export default IndexEntries
