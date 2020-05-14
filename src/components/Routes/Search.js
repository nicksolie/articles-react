import React, { useState, useEffect } from 'react'
// import React, { useState } from 'react'
// import React, { useEffect } from 'react'
import axios from 'axios'

const Search = () => {
  const [search, setSearch] = useState([])
  // const [search] = useState([])

  useEffect(() => {
    axios('https://chroniclingamerica.loc.gov/lccn/sn86069873/1897-01-08/ed-1.json')
      .then(response => response.data.pages)
      .then(pages => setSearch(pages))
      // .then(data => console.log(data))
      .catch(console.error)
  }, [])

  const searchJsx = search.map(result => (
    <li key={result.sequence}>
      <p>{result.url}</p>
    </li>
  ))
  // console.log(search)

  return (
    <div>
      <h1>Search</h1>
      {searchJsx}
    </div>
  )
}

// Format
// <p><embed src={search} type="application/pdf" height="600px" width="600px" /></p>

export default Search
