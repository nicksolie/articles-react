import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import Jumbotron from 'react-bootstrap/Jumbotron'
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  PseudoBox,
  // Grid
} from "@chakra-ui/core";

const SearchPublications = () => {
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

  const filteredListJsx = newList.map((issues, index) =>
    <PseudoBox
    role="group"
    maxW="sm"
    overflow="hidden"
    rounded="md"
    p={5}
    cursor="pointer"
    bg="white"
    boxShadow="md"
    _hover={{ bg: "blue.500" }}
    key={index}
    _active={{ bg: "blue.700" }}
    marginBottom={'10px'}
  >
    <PseudoBox
      fontWeight="semibold"
      fontSize="lg"
      mb={1}
      color="gray.900"
      _groupHover={{ color: "black" }}
    >
      {issues.name}
    </PseudoBox>
    <PseudoBox color="gray.700" mb={2} _groupHover={{ color: "black" }}>
      Start Year: {issues.start_year}
      <Button variant="secondary" onClick={() => setPublication(issues.url)}>View</Button>
    </PseudoBox>
  </PseudoBox>
  )
  console.log(publication)
  // <Jumbotron key={index}>
  //     <h1>{issues.name}</h1>
  //     <p>Start Year: {issues.start_year}</p>
  //     <p>End Year: {issues.end_year}</p>
  //     <p>Place of publication: {issues.place_of_publication}</p>
  //     <p>
  //       <Button variant="secondary" onClick={() => setPublication(issues.url)}>View</Button>
  //     </p>
  //   </Jumbotron>

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

      <Box as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="word1">Enter Search</FormLabel>
          <Input height size="md" variant="flushed" id="word1" placeholder="Bourbon+News" onChange={handleChange} />
          <FormHelperText id="email-helper-text">
            Well never share your email.
          </FormHelperText>
        </FormControl>
        <Button variant="secondary" type="submit">Submit</Button>
      </Box>

      <div style={{textItems:'center'}}>
        <h3 style={{marginBottom:'20px'}}>Available Publications:</h3>
        {filteredListJsx}
      </div>
    </div>
  )
}

  // ----------------------------------BOOTSTRAP FORM---------------------------------------------------------------------
  // <Container>
  //   <Form onSubmit={handleSubmit}>
  //     <Row>
  //       <Col md="10">
  //         <Form.Control placeholder="term1+term2" name="word1"  onChange={handleChange} />
  //       </Col>
  //       <Col>
  //         <Button variant="secondary" type="submit">Submit</Button>
  //       </Col>
  //     </Row>
  //   </Form>
  // </Container>
  // -------------------------------------------------------------------------------------------------------

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

export default SearchPublications
