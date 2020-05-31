import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
// import CheckIcon from '@material-ui/icons/Check';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Grid } from '@material-ui/core';

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
    justifyContent:'center',
  },
  showResults: {
    margin:'20px',
  },
  publicationButton: {
    justifyContent:'center'
  },
  submitPublicationButton: {
    justifyContent:'center',
    marginBottom:'20;x'
  },
  ToggleButton: {
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
  const [selected, setSelected] = useState([]);


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

  
  // Map the return of publications from search query
  const filteredListJsx = newList.map((issues, index) =>
  <Grid key={index} item xs={12} sm={6} md={6}>
    <Card className={classes.root}>
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
          <ToggleButton
            value="check"
            selected={(selected.includes(index))}
            onChange={() => {
              // mappedIndex is "index"
              // If Selected array includes mappedIndex
              if (selected.includes(index)) {
                // Find mappedIndex's index within Selected array
                const i = selected.indexOf(index)
                const p = publications.indexOf(issues.url)
                // Remove mappedIndex from Selected array by slicing before mappedIndex and after mappedIndex
                setSelected(prevArray => [...prevArray.slice(0, i), ...prevArray.slice(i + 1)])
                setPublications(prevArray => [...prevArray.slice(0, p), ...prevArray.slice(p + 1)])
              } else {
                // Otherwise, added mappedIndex to Selected
                setSelected(prevArray => [...prevArray, index])
                setPublications(prevArray => [...prevArray, issues.url])
              }
            }}
          >
            <AddBoxIcon style={{ fontSize: 40 }}/>
          </ToggleButton>
        </CardActions>
      </Card>
    </Grid>
  )
  
  //  If user selects a publication - redirect
  if (submittedSelected) {
    return <Redirect to={{
      pathname: '/search-publication-issues',
      state: { url: publications }
    }} />
  }

  console.log(publications)
  console.log(selected)

  return (
    <div style={{textAlign:'center'}}>
      <h1>Search by Publication Title</h1>
      <p>Note: some publications return blank. If this occurs, select a new term.</p>
      <p>Note: use &quot;+&quot; rather than a space.</p>
      <p>Example searches: &quot;Washington&quot; or &quot;Bourbon+News&quot;</p>
        <form onSubmit={handleSearchSubmit}>
          <TextField xs={3} label="Enter Search Terms" helperText="term1+term2" name="word1"  onChange={handleChange} />
          <Button className={classes.searchButton} variant="contained" disableElevation type="submit">Search</Button>
        </form>
      <div style={{textItems:'center'}}>
        <Paper elevation={1} className={classes.showResults}>
          {(submittedSearch && <h3>Showing Results for: &quot;{submittedSearch}&quot;</h3> )}
          {(submittedSearch && <Button onClick={() => setSubmittedSelected(true)} variant="contained" color="secondary" disableElevation className={classes.submitPublicationButton}>Submit Selected</Button>)}
        </Paper>
      </div>
      <Grid container spacing={3}>
          {filteredListJsx}
        </Grid>
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
