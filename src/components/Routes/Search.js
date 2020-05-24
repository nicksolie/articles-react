// import React, { useState, useEffect } from 'react'
import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Search = (props) => {
  const [firstEdition, setFirstEdition] = useState([])
  const [pagesIndex, setPagesIndex] = useState([])

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
  useEffect(() => {
    // On page load when firstEdition is empty, perform axios call to get queried edition
    if (firstEdition.length === 0) {
      //   Props... looks like, https://chroniclingamerica.loc.gov/lccn/sn86069872.json
      axios(props.location.state.url)
        // Find all first editions of the query
        .then(response => setFirstEdition(response.data.issues.shift()))
    // Else check if pageIndex has not been populated, then get all the pages in firstEdition
    } else if (pagesIndex.length === 0) {
      axios(firstEdition.url)
        .then(response => response.data.pages.forEach(result => (
          axios(result.url)
          .then(response => setPagesIndex(searches => [...searches, response.data]))
        )))
    }
  })
  // ----------------------------------------------------------------------------------------------------

  console.log('fristEditions', firstEdition)
  console.log('pagesIndex is', pagesIndex)
  // Transform search into a list of pdf links
  const searchJsx = pagesIndex.map(data =>
    <div key={data.sequence}>
      <h4>Date: {data.issue.date_issued}</h4>
      <p><embed src={data.pdf} type="application/pdf" height="800px" width="800px" /></p>
    </div>
  )

  return (
    <div>
      <h1>Search</h1>
      <p>Please allow up to a minute for all pages to load.</p>
      <p>Below are the results of your search!</p>
      {searchJsx}
    </div>
  )
}

  // ======================================tami
    // useEffect(() => {
  //   if (firstEditions.length === 0) {
  //     axios(props.location.state.url)
  //       // Find all first editions of the query
  //       .then(response => setFirstEditions(response.data.issues.pop()))
  //   } else {
  //     const promises = []
  //     axios(firstEditions.url)
  //       .then(response => response.data.pages.forEach(result => {
  //         promises.push(axios(result.url))
  //         axios.all(promises).then(response => setPagesIndex(searches => [...searches, response.pdf]))
  //       }))
  //   }
  // })

export default Search
