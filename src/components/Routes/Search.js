// import React, { useState, useEffect } from 'react'
import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Search = (props) => {
  // const [pdfs, setPdfs] = useState([])
  const [pdfs] = useState([])
  const [firstEditions, setFirstEditions] = useState([])
  const [pagesIndex, setPagesIndex] = useState([])
  // const [firstEditions] = useState([])

  // -----------------------------Index ALL pages from query--------------------------------
  // useEffect(() => {
  //   Props... looks like, https://chroniclingamerica.loc.gov/lccn/sn86069872.json
  //   axios(props.location.state.url)
  //     // Filter response down to a issue's pages array
  //     .then(response => response.data.issues)
  //     .then(issues => issues.forEach(result =>
  //       axios(result.url)
  //         .then(response => response.data.pages)
  //         .then(pages => pages.forEach(result => (
  //           axios(result.url)
  //             .then(response => setPdfs(searches => [...searches, response.data]))
  //         )))
  //     ))
  //     // ForEach page, make a call to the pdf
  // }, [])
  // ------------------------------------------------------------------------------------------

  // -----------------------------Select ALL page from first edition -------------------------------------------
  // useEffect(() => {
  //   axios(props.location.state.url)
  //     .then(response => response.data.issues)
  //     // Find all first editions of the query
  //     .then(issues => setFirstEditions(issues.pop()))
  // }, [])
  useEffect(() => {
    if (firstEditions.length === 0) {
      axios(props.location.state.url)
        // Find all first editions of the query
        .then(response => setFirstEditions(response.data.issues.pop()))
    } else {
      const promises = []
      axios(firstEditions.url)
        .then(response => response.data.pages.forEach(result => {
          promises.push(axios(result.url))
          axios.all(promises).then(response => setPagesIndex(searches => [...searches, response.pdf]))
        }))
    }
  })
  // .then(response => setPagesIndex(searches => [...searches, response.data.pdf]))

  console.log(pagesIndex)

  // ---------NOTES--------
  // -------------------------------------------------------------------------------------------

  // console.log(pdfs)
  // Transform search into a list of pdf links
  const searchJsx = pdfs.map(data =>
    <p key={data.sequence}><embed src={data.pdf} type="application/pdf" height="800px" width="800px" /></p>
  )

  return (
    <div>
      <h1>Search</h1>
      <p>Please allow up to a minute for all pages to load. Future versions will limit the number of PDFs your browser needs to render.</p>
      <p>Below are the results of your search!</p>
      {searchJsx}
    </div>
  )
}

export default Search
