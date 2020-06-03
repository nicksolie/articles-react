import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { TextField } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import AddBoxIcon from '@material-ui/icons/AddBox'
import ToggleButton from '@material-ui/lab/ToggleButton'
import { Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Autocomplete from '@material-ui/lab/Autocomplete';

const suggestedSearchs = [
  { search: '' },
  { search: 'Bourbon+News' },
  { search: 'Washington' },
  { search: 'Rebel' },
  { search: 'Ohio' },
]

const useStyles = makeStyles({
  main: {
    marginTop:'30px',
    marginBottom:'40px',
    // width:'75%',
    justifyContent:'center'
  },
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
  },
  skeleton: {
    minWidth: 275,
  }
})

const SearchPublications = () => {
  const [search, setSearch] = useState('')
  const [publicationsList, setPublicationsList] = useState([])
  const [publications, setPublications] = useState([])
  const classes = useStyles()
  const [submittedSearch, setSubmittedSearch] = useState(false)
  const [submittedAll, setSubmittedAll] = useState(false)
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(suggestedSearchs[0])
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    event.persist()
    // eslint-disable-next-line no-unused-vars
    setSearch(search => (event.target.value))
  }

  const handleSearchSubmit = event => {
    event.preventDefault()
    setLoading(true)
    setSubmittedSearch(search)
    setPublicationsList([])
    // Add search term to query
    axios(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${search}&format=json`)
      // Filter response to array
      .then(response => response.data.items.forEach(result =>
        // Go to url for publication information
        axios(result.url)
          .then(response => setPublicationsList(searches => [...searches, response.data]))
      ))
      .catch(console.error)
      .finally(setLoading(false))
  }
  // Filter out publications with no issues.
  const filteredPublicationList = publicationsList.filter((publicationsList) =>
    publicationsList.issues.length !== 0,
  )

  const emptyPublicationList = publicationsList.filter((publicationsList) =>
    publicationsList.issues.length === 0
  )

  // Map the return of publications from search query
  const filteredListJsx = filteredPublicationList.map((issues, index) =>
  <Grid key={index} item xs={12} sm={6} md={6}>
    <Card className={classes.main}>
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
            className={classes.searchButton}
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
            <AddBoxIcon />
            Add to Search
          </ToggleButton>
          {/* <Button variant="outlined" color="secondary">
            <s>Add to Collection</s> (TBA)
          </Button> */}
        </CardActions>
      </Card>
    </Grid>
  )

  const Jsx = (
    <div style={{marginTop:'50px'}}>
      <h1>There are no results that match your search. Please try again.</h1>
      <p>This website rejects any responses from Chronicling America that do not contain any PDFs. If you are interested in seeing data aside from PDFs, please notify the owner of this site.</p>
    </div>
  )

  //  If user selects a publication - redirect
  if (submittedAll) {
    return <Redirect to={{
      pathname: '/search-publication-issues',
      state: { url: publications }
    }} />
  }

  console.log(search)

  return (
    <div style={{textAlign:'center'}}>

      <Card className={classes.main} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="h5" component="h2">
            Search by Publication Title
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Note: Spaces are not allowed - Use &quot;+&quot;
          </Typography>

          {/* Search Form w/ Autocomplete */}
          <form onSubmit={handleSearchSubmit}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                setSearch(newInputValue)
              }}
                options={suggestedSearchs}
                getOptionLabel={(option) => option.search}
                id="search-publications"
                renderInput={(params) => <TextField {...params} xs={3} label="Enter Search Terms" helperText="term1+term2" margin="normal" onChange={handleChange} />}
              />
            <Button className={classes.searchButton} variant="contained" disableElevation type="submit">Search</Button>
          </form>
          <Paper elevation={1} className={classes.showResults}>
            {(submittedSearch && <h3>Showing Results for: &quot;{submittedSearch}&quot;</h3> )}
          </Paper>
          <CardActions className={classes.searchButton}>
            {(submittedSearch && <Button onClick={() => setSubmittedAll(true)} variant="outlined" color="secondary" disableElevation className={classes.submitPublicationButton}>Submit Selected Publications</Button>)}
          </CardActions>
        </CardContent>
      </Card>

      <Grid container spacing={3}>

      {/* If loading, render skeletons */}
      {loading ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Skeleton height={200} className={classes.skeleton} />
          </Grid>
        </Grid>
      ) : filteredListJsx}
      </Grid>
      {/* <Jsx /> */}
      {((loading === false && submittedSearch && emptyPublicationList.length === 0) && Jsx )}
    </div>
  )
}

export default SearchPublications
