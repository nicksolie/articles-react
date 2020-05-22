// import React from 'react'
import React, { useState } from 'react'
import axios from 'axios'

const SearchForm = () => {
  const [search, setSearch] = useState({
    keyword1: ''
  })

  const [publications, setPublications] = useState([])

  // const [url] = useState([])
  const handleChange = event => {
    event.persist()
    // eslint-disable-next-line no-unused-vars
    setSearch(search => (event.target.value))
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Add search term to query
    axios(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${search}&format=json`)
      // Filter response to array
      .then(response => response.data.items)
      // Iterate through array of items to find urls
      .then(items => items.forEach(result =>
        // Go to url for publication information
        axios(result.url)
          // If publications.includes response
          .then(response => setPublications(searches => [...searches, response.data]))
      ))
      .catch(console.error)

    console.log(search)
    console.log('publications are', publications)
  }

  console.log(publications)

  const publicationJsx = publications.map(issues =>
    <p key={issues.url}>{issues.lccn}</p>
  )

  return (
    <div>
      <h1>Enter key words</h1>
      <form onSubmit={handleSubmit}>
        <label>Input word 1</label>
        <input
          placeholder="word 1"
          name="word1"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      <h3>results</h3>
      {publicationJsx}
    </div>
  )
}
// --------------------READ------------------------
// display publication information
// Give link to newspaper object, for future access to pdfs.

export default SearchForm
