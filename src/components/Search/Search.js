import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
})

const Search = (props) => {
  const classes = useStyles()
  const [publications, setPublications] = useState([])
  // const [indexPublication, setIndexPublication] = useState([])

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
        <Typography className={classes.issues} variant="body2" component="p">
          {publication.issues.map((item, index) => (
            <Card key={index} className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Issue: {index}
                </Typography>
                <Typography variant="h5" component="h2">
                  Issue Date: {item.date_issued}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Select</Button>
              </CardActions>
            </Card>
          ))}
          <br />
          {'"a benevolent smile"'}
        </Typography>

      </CardContent>
    </Card>
  ))

  // Display the publication infomation in a partition
  // Index all issues in a publication within a card

  console.log(publications)

  return (
    <div>
      <h1>Search</h1>
      <p>Please allow up to a minute for all pages to load.</p>
      <p>Below are the results of your search!</p>
      {publicationsJsx}
    </div>
  )
}

// ----------------------------------BOOTSTRAP---------------------------------------------------------
{/* <Card key={index} style={{margin:'5px', marginBottom:'20px', padding:'0', width:'18rem'}}>
<Card.Header style={{fontWeight:'bold'}}>Date Issued: {data.date_issued}</Card.Header>
<ListGroup variant="flush">
  <ListGroup.Item><Button type="submit" href={data.url} size="sm">Select</Button></ListGroup.Item>
</ListGroup>
</Card> */}

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
