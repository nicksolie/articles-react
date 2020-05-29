import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
// import Jumbotron from 'react-bootstrap/Jumbotron'
// import Row from 'react-bootstrap/Row'
// import Container from 'react-bootstrap/Container'
// import Col from 'react-bootstrap/Col'
// import Form from 'react-bootstrap/Form'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: '10px',
  },
  title: {
    fontSize: 14,
  },
  pop: {
    marginBottom: 12,
  },
  searchButton: {
    textAlign: 'center',
  },
  showResults: {
    margin:'20px',
  },
  publicationButton: {
    justifyContent:'center'
  }
})

const SearchPublications = () => {
  const [search, setSearch] = useState('')
  const [publicationsList, setPublicationsList] = useState([])
  const [publications, setPublications] = useState([])
  const classes = useStyles()
  const [submittedSearch, setSubmittedSearch] = useState(false)
  const [submittedSelected, setSubmittedSelected] = useState(false)

  // const [url] = useState([])
  const handleChange = event => {
    event.persist()
    // eslint-disable-next-line no-unused-vars
    setSearch(search => (event.target.value))
  }

  const handleSearchSubmit = event => {
    event.preventDefault()
    setSubmittedSearch(search)
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
  <Card key={index} className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {issues.name}
          </Typography>
          <Divider />
          <Typography className={classes.pop} color="textSecondary">
            {issues.place_of_publication}
          </Typography>
          <Typography variant="body1" component="p">
            Start Year: <i>{issues.start_year}</i>
            <br />
            End Year: <i>{issues.end_year}</i>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setPublications(prevArray => [...prevArray, issues.url])}>View</Button>
        </CardActions>
      </Card>
  )
  
  console.log(publications)
  //  If user selects a publication - redirect
  if (submittedSelected) {
    return <Redirect to={{
      pathname: '/search',
      state: { url: publications }
    }} />
  }

  return (
    <div style={{textAlign:'center'}}>
      <h1>Search by Publication Title</h1>
      <p>Note: some publications return blank. If this occurs, select a new term.</p>
      <p>Note: use &quot;+&quot; rather than a space.</p>
      <p>Example searches: &quot;Washington&quot; or &quot;Bourbon+News&quot;</p>
        <form onSubmit={handleSearchSubmit}>
          <TextField label="Enter Search Terms" helperText="term1+term2" name="word1"  onChange={handleChange} />
          <Button className={classes.searchButton} type="submit">Search</Button>
        </form>
      <div style={{textItems:'center'}}>
        <Paper elevation={1}>
          {(submittedSearch && <h3 style={{marginBottom:'20px'}}>Showing Results for: &quot;{submittedSearch}&quot;</h3>)}
        </Paper>
        <Button onClick={() => setSubmittedSelected(true)} className={classes.publicationButton}>Submit Selected</Button>
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

//   <Jumbotron key={index}>
//   <h1>{issues.name}</h1>
//   <p>Start Year: {issues.start_year}</p>
//   <p>End Year: {issues.end_year}</p>
//   <p>Place of publication: {issues.place_of_publication}</p>
//   <Button variant="secondary" onClick={() => setPublications(prevArray => [...prevArray, issues.url])}>View</Button>
//   </Jumbotron>

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

  // If user selects a publication - redirect
  // if (publication) {
  //   return <Redirect to={{
  //     pathname: '/search',
  //     state: { url: publication }
  //   }} />
  // }

export default SearchPublications
