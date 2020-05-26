import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/card'
import ListGroup from 'react-bootstrap/ListGroup'

// import CardDeck from 'react-bootstrap/CardDeck'

const Search = (props) => {
  const [editions, setEditions] = useState([])
  // const [editions] = useState([])
  // const [pagesIndex, setPagesIndex] = useState([])

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

  // --------------------------------FIRST EDITION----------------------------------------------------------
  // useEffect(() => {
  //   // On page load, when firstEdition is empty, perform axios call to get queried edition
  //   if (firstEdition.length === 0) {
  //     // Passed URL will look like this: https://chroniclingamerica.loc.gov/lccn/sn86069872.json
  //     axios(props.location.state.url)
  //       // Find  first edition of the query
  //       .then(response => setFirstEdition(response.data.issues.shift()))
  //   // Check if pageIndex has not been populated, then get all the pages in firstEdition
  //   } else if (pagesIndex.length === 0) {
  //     axios(firstEdition.url)
  //       // Iterate through all the pages in the firstEdition
  //       .then(response => response.data.pages.forEach(result => (
  //         axios(result.url)
  //         .then(response => setPagesIndex(searches => [...searches, response.data]))
  //       )))
  //   }
  // })
  // ------------------------------------------------------------------------------------------

    useEffect(() => {
      if (editions.length === 0) {
        // Passed URL will look like this: https://chroniclingamerica.loc.gov/lccn/sn86069872.json
        axios(props.location.state.url)
          .then(response => setEditions(response.data.issues))
      }
    })

console.log(editions)

  const editionsJsx = editions.map(data =>
    <Card key={data.url} style={{ width: '18rem' }}>
      <Card.Header>{data.date_issued}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><a href={data.url}>View</a></ListGroup.Item>
      </ListGroup>
    </Card>
  )
  
  // console.log('fristEditions', firstEdition)
  // console.log('pagesIndex is', pagesIndex)

  // Transform search into a list of pdf links
  // const searchJsx = pagesIndex.map(data =>
  //   <div key={data.sequence}>
  //     <h4>Date: {data.issue.date_issued}</h4>
  //     <p><embed src={data.pdf} type="application/pdf" height="800px" width="800px" /></p>
  //   </div>
  // )

  return (
    <div>
      <h1>Search</h1>
      <p>Please allow up to a minute for all pages to load.</p>
      <p>Below are the results of your search!</p>
      {editionsJsx}
    </div>
  )
}

export default Search
