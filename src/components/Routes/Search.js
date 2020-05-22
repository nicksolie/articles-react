import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {
  const [pdfs, setPdfs] = useState([])

  useEffect(() => {
    axios('https://chroniclingamerica.loc.gov/lccn/sn86069873/1897-01-08/ed-1.json')
      // Filter response down to a issue's pages array
      .then(response => response.data.pages)
      // ForEach page, make a call to the pdf
      .then(pages => pages.forEach(result => (
        axios(result.url)
          // set search state to push a new link to the end of seach
          .then(response => setPdfs(searches => [...searches, response.data]))
      )))
      .catch(console.error)
  }, [])

  console.log(pdfs)
  // Transform search into a list of pdf links
  const searchJsx = pdfs.map(data =>
    <p key={data.sequence}><embed src={data.pdf} type="application/pdf" height="800px" width="800px" /></p>
  )

  return (
    <div>
      <h1>Search</h1>
      {searchJsx}
    </div>
  )
}

export default Search
