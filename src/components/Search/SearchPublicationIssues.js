import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import ToggleButton from '@material-ui/lab/ToggleButton'
import AddBoxIcon from '@material-ui/icons/AddBox'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom:'30px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  issues: {
    justifyContent:'center',
    marginBottom:'10px',
  },
  showResults: {
    bottomMargin:'20px',
  }
})

const Search = (props) => {
  const classes = useStyles()
  const [publications, setPublications] = useState([])
  const [submittedSelectAll, setSubmittedSelectAll] = useState(false)
  const [submittedSelected, setSubmittedSelected] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState([])
  const [selectedIssues, setSelectedIssues] = useState([])
  const [readyIssues, setReadyIssues] = useState([])

  useEffect(() => {
    // On page load, perform axios call to get queried publications
    if (publications.length === 0) {
      props.location.state.url.forEach(item => (
        axios(item)
          .then(response => setPublications(result => [...result, response.data]))
      ))
    }
  })

  const publicationsJsx = publications.map((publication, index) => (
    <Card key={index} className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Publication: {index}
        </Typography>
        <Typography variant="h5" component="h2">
          {publication.name}
        </Typography>
        <Divider light />

        {/* Publication details */}
        <Typography className={classes.pos} color="textSecondary">
        Place of Publication: {publication.place_of_publication}
        <br />
        Start Year: <i>{publication.start_year}</i>
        <br />
        End Year: <i>{publication.end_year}</i>
        <br />
        </Typography>
        <Divider light />

        {/* Index of all issues in plublication */}
        <Typography className={classes.issues} variant="body2" component="div">
        <Grid container spacing={3}>
          {publication.issues.map((item, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Card  className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Issue: {index}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Issue Date: {item.date_issued}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ToggleButton
                    value="check"
                    selected={(selectedIndex.includes(index))}
                    onChange={() => {
                      // mappedIndex is "index"
                      // If Selected array includes mappedIndex
                      if (selectedIndex.includes(index)) {
                        // Find mappedIndex's index within Selected array
                        const i = selectedIndex.indexOf(index)
                        const p = publications.indexOf(publication.url)
                        // Remove mappedIndex from Selected array by slicing before mappedIndex and after mappedIndex
                        setSelectedIndex(prevArray => [...prevArray.slice(0, i), ...prevArray.slice(i + 1)])
                        setSelectedIssues(prevArray => [...prevArray.slice(0, p), ...prevArray.slice(p + 1)])
                      } else {
                        // Otherwise, added mappedIndex to Selected
                        setSelectedIndex(prevArray => [...prevArray, index])
                        setSelectedIssues(prevArray => [...prevArray, publication.url])
                      }
                    }}
                  >
                    <AddBoxIcon style={{ fontSize: 40 }}/>
                  </ToggleButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <br />
          {'"a benevolent smile"'}
          </Grid>
        </Typography>

      </CardContent>
    </Card>
  ))

  // Display the publication infomation in a partition
  // Index all issues in a publication within a card

  console.log('publications are', publications)
  console.log('selectedIndex are', selectedIndex )
  console.log('selectedIssues are', selectedIssues)

  // if ready issues is different that selected issues
  if (readyIssues.length !== selectedIssues.length) {
   selectedIssues.filter(issue => !readyIssues(issue))
  }  

  // DOES NOT INCLUDE
  if (readyIssues.length !== selectedIssues.length) {
    selectedIssues.map(selectedIssue => (
      axios(selectedIssue)
        .then(response => response.data.issues.map(issue => (
          axios(issue.url)
            .then(response => setReadyIssues(selectedIssue => [...selectedIssue, response.data]))
        )))
    ))

  // Redirect if Submit all is clicked
  if (submittedSelectAll) {
    return <Redirect to={{
      pathname: '/search-publication-all-results',
      state: { url: publications }
    }} />
  }

  // Redirect if selected issues is clicked
  if (submittedSelected) {
    return <Redirect to={{
      pathname: '/search-publication-Selected-results',
      state: { url: readyIssues }
    }} />
  }

  return (
    <div>
      <h1>Availible Issues</h1>
      <p>Below are the issues corresponding to your submission! Select from the presented issues to view their records. </p>
      <div className={classes.showResults}>
        <Paper elevation={1}>
          {(publications && <Button onClick={() => setSubmittedSelectAll(true)} variant="contained" color="secondary" disableElevation className={classes.submitPublicationButton}>Submit All (DANGER)</Button>)}
        </Paper>
        <Paper elevation={1}>
        {(selectedIssues && <Button onClick={() => setSubmittedSelected(true)} variant="contained" color="secondary" disableElevation className={classes.submitPublicationButton}>Submit Selected</Button>)}
        </Paper>
      </div>
      {publicationsJsx}
    </div>
  )
}

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

export default Search
