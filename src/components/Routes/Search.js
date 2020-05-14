import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {
  const [search, setSearch] = useState([])
  // const [search] = useState([])

  useEffect(() => {
    axios('https://chroniclingamerica.loc.gov/lccn/sn86069873/1897-01-08/ed-1/seq-1.json')
      .then(res => setSearch(res.data.pdf))
      .catch(console.error)
  }, [])
  console.log(search)
  // const searchJsx = search.pdf.map(search => (
  //   <p key={search.id}><embed src={search} /></p>
  // ))

  // const searchJsx = ${search}

  return (
    <div>
      <h1>Search</h1>
      <p><embed src={search} type="application/pdf" height="400px" width="400px" /></p>
    </div>
  )
}

export default Search
