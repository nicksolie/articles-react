import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SearchForm = () => {
  const [search, setSearch] = useState({
    keyword1: ''
  })

  const [publicationsList, setPublicationsList] = useState([])
  const [publication, setPublication] = useState()

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
          .then(response => setPublicationsList(searches => [...searches, response.data]))
      ))
      .catch(console.error)
  }

  // Filter out publications with no issues.
  const newList = publicationsList.filter((publicationsList) =>
    publicationsList.issues.length !== 0
  )

  // const handlePublicationSubmit = (event, issues) => {
  //   event.preventDefault()
  //   setPublication(issues.url)
  // }

  // Filtered publication list that is rendered on page
  const filteredListJsx = newList.map(issues =>
    // Url is the only unique ID in object
    <div key={issues.url}>
      <h4><a href={issues.url}>{issues.name}</a></h4>
      <p>Start Year: {issues.start_year}</p>
      <p>End Year: {issues.end_year}</p>
      <p>Place of publication: {issues.place_of_publication}</p>
      <button onClick={() => setPublication(issues.url)}>View</button>
    </div>
  )

  // If user selects a publication - redirect
  if (publication) {
    return <Redirect to={{
      pathname: '/search',
      state: { url: publication }
    }} />
  }
  // console.log(props)
  console.log(newList)
  console.log(publication)

  // ------------------------Notes------------------
  // Select a publication
  // Reroute to Search w/ props

  return (
    <div>
      <h1>Enter key word</h1>
      <p>Example: &quot;bourbon+news&quot;</p>
      <form onSubmit={handleSubmit}>
        <label>Input word 1</label>
        <input
          placeholder="word 1"
          name="word1"
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Publications</h3>
      {filteredListJsx}
    </div>
  )
}

export default SearchForm
