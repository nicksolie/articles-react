import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const SearchPublications = () => {
  const [search, setSearch] = useState({
    keyword1: ''
  })

  const [publicationsList, setPublicationsList] = useState([])
  const [publication, setPublication] = useState()

  // const filteredStyles = {
  //   border: "1px solid black",
  //   marginBottom: '10px',
  //   padding: '10px',
  //   textAlign:'center'
  // }  

  // const [url] = useState([])
  const handleChange = event => {
    event.persist()
    // eslint-disable-next-line no-unused-vars
    setSearch(search => (event.target.value))
  }

  const handleSubmit = event => {
    event.preventDefault()
    setPublicationsList([])
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

  // // Filtered publication list that is rendered on page
  // const filteredListJsx = newList.map(issues =>
  //   // Url is the only unique ID in object
  //   <div style={filteredStyles} key={issues.url}>
  //     <h4>{issues.name}</h4>
  //     <p>Start Year: {issues.start_year}</p>
  //     <p>End Year: {issues.end_year}</p>
  //     <p>Place of publication: {issues.place_of_publication}</p>
  //     <button onClick={() => setPublication(issues.url)}>View</button>
  //   </div>
  // )
  const filteredListJsx = newList.map((issues, index) =>
    <Jumbotron key={index}>
      <h1>{issues.name}</h1>
      <p>Start Year: {issues.start_year}</p>
      <p>End Year: {issues.end_year}</p>
      <p>Place of publication: {issues.place_of_publication}</p>
      <p>
        <Button variant="secondary" onClick={() => setPublication(issues.url)}>View</Button>
      </p>
    </Jumbotron>
  )
  // If user selects a publication - redirect
  if (publication) {
    return <Redirect to={{
      pathname: '/search',
      state: { url: publication }
    }} />
  }

  return (
    <div style={{textAlign:'center'}}>
      <h1>Search by Publication Title</h1>
      <p>Note: some publications return blank. If this occurs, select a new term.</p>
      <p>Note: use &quot;+&quot; rather than a space.</p>
      <p>Example searches: &quot;Washington&quot; or &quot;Bourbon+News&quot;</p>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md="10">
              <Form.Control placeholder="term1+term2" name="word1"  onChange={handleChange} />
            </Col>
            <Col>
              <Button variant="secondary" type="submit">Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <div style={{textItems:'center', marginTop:'15px'}}>
        <h3 style={{marginBottom:'20px'}}>Available Publications:</h3>
        {filteredListJsx}
      </div>
    </div>
  )
}

export default SearchPublications
