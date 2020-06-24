import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { AutoComplete, Breadcrumb, Button, Card, Col, Form, Row } from 'antd'
import newspaperIndex from '../../newspaperIndex'

const suggestedSearches = [
  { value: 'Washington' },
  { value: 'Toiler' },
  { value: 'Bourbon+News' }
]

console.log('papers', newspaperIndex)

const SearchPublications = () => {
  const [search, setSearch] = useState('')
  const [publicationsList, setPublicationsList] = useState([])
  const [publication, setPublication] = useState([])
  // const [submitted, setSubmitted] = useState(false)
  // const [submittedAll, setSubmittedAll] = useState(false)
  // const [selected, setSelected] = useState([]);
  // const [loading, setLoading] = useState(false)
  // const [value, setValue] = useState(suggestedSearchs[0])
  // const [inputValue, setInputValue] = useState('')
  const { Meta } = Card;

  const handleSearchSubmit = () => {
    if (search === '') {
      return
    }
    // setLoading(true)
    // setSubmittedSearch(search)
    setPublicationsList([])
    // Add search term to query
    axios(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${search}&format=json`)
      // Filter response to array
      .then(response => response.data.items.map(result =>
        // Go to url for publication information
        axios(result.url)
          .then(response => setPublicationsList(searches => [...searches, response.data]))
      ))
      .catch(console.error)
      // .finally(setLoading(false))
  }

  // Filter out publications with no issues.
  const filteredPublicationList = publicationsList.filter((publicationsList) =>
    publicationsList.issues.length !== 0,
  )

  // don't forget to add a row contrainer
  const filteredListJsx = filteredPublicationList.map((publication, index) =>
    <Col key={index} xs={24} sm={12} order={index}>
      <Card title={publication.name}
      actions={[
        <Button onClick={() => setPublication(publication)} key="view">View</Button>,
        ]}
      style={{marginBottom: '30px', border: 'black solid 0.1px'}}
      >
        <p>{publication.place_of_publication}</p>
        <p>{publication.start_year}</p>
        <p>{publication.end_year}</p>
      </Card>
    </Col>
  )

  console.log('search:', search)
  console.log('publication', publication)

  //  If user selects a publication - redirect
  if (publication.length !== 0) {
    return <Redirect to={{
      pathname: '/search-publication-issues',
      state: { publication: publication }
    }} />
  }

  const handleSearch = (value) => {
    setSearch(value)
  };

  const onSelect = (value) => {
    setSearch(value)
  };

  return (
    <div>
      <Breadcrumb style={{margin: '30px'}}>
        <Breadcrumb.Item><a href="#home">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item>Search Publications</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="center">
        <Col xs={24}>         
          <Card style={{border: 'black solid 0.1px', marginBottom: '10px', textAlign: 'center' }}>
            <Meta
              title="Search by Publication Name"
              description="Note: Spaces are not allowed - Use &quot;+&quot;"
            />
            <Form onFinish={() => handleSearchSubmit()} style={{marginTop: '5px'}}>
              <Form.Item>
                <AutoComplete
                  style={{ width: 300, marginRight: '10px' }}
                  placeholder="Example: term1+term2"
                  options={suggestedSearches}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                />
                <Button style={{marginTop: '5px'}} type="primary" htmlType="submit">Search</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row style={{textAlign: 'center'}} justify="space-around" gutter={{xs: 8, sm: 16, md: 24}}>
          {filteredListJsx}
      </Row>
    </div>
  )
}

export default SearchPublications  

// ---------------------------------------------------------------------------------------

// import React, { useState } from 'react'
// import axios from 'axios'
// import { Redirect } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Divider from '@material-ui/core/Divider'
// import { TextField } from '@material-ui/core'
// import Paper from '@material-ui/core/Paper'
// import AddBoxIcon from '@material-ui/icons/AddBox'
// import ToggleButton from '@material-ui/lab/ToggleButton'
// import { Grid } from '@material-ui/core'
// import Skeleton from '@material-ui/lab/Skeleton'
// import Autocomplete from '@material-ui/lab/Autocomplete';
// // import { AutoComplete } from 'antd';


// const suggestedSearchs = [
//   { search: '' },
//   { search: 'Kansas' },
//   { search: 'Washington' },
//   { search: 'Labor' },
//   { search: 'Independent' },
//   { search: 'Ohio' },
//   { search: 'Bourbon+News'}
// ]

// const useStyles = makeStyles({
//   main: {
//     marginTop:'20px',
//     // width:'75%',
//     justifyContent:'center'
//   },
//   root: {
//     minWidth: 275,
//     marginBottom: '10px',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pop: {
//     marginBottom: 12,
//   },
//   searchButton: {
//     textAlign:'center',
//     alignItems:'center',
//     justifyContent:'center',
//   },
//   AddPublicationButton: {
//     textAlign:'center',
//     alignItems:'center',
//     justifyContent:'center',
//     marginBottom:'7px'
//   },
//   showResults: {
//     margin:'20px',
//   },
//   submitPublicationButton: {
//     justifyContent:'center',
//     marginBottom:'20px'
//   },
//   ToggleButton: {
//     justifyContent:'center'
//   },
//   skeleton: {
//     minWidth: 275,
//   }
// })

// const SearchPublications = () => {
//   const [search, setSearch] = useState('')
//   const [publicationsList, setPublicationsList] = useState([])
//   const [publications, setPublications] = useState([])
//   const classes = useStyles()
//   const [submittedSearch, setSubmittedSearch] = useState(false)
//   const [submittedAll, setSubmittedAll] = useState(false)
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false)
//   const [value, setValue] = useState(suggestedSearchs[0])
//   const [inputValue, setInputValue] = useState('')

//   const handleChange = event => {
//     event.persist()
//     // eslint-disable-next-line no-unused-vars
//     setSearch(search => (event.target.value))
//   }

//   const handleSearchSubmit = event => {
//     event.preventDefault()
//     setLoading(true)
//     setSubmittedSearch(search)
//     setPublicationsList([])
//     // Add search term to query
//     axios(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${search}&format=json`)
//       // Filter response to array
//       .then(response => response.data.items.forEach(result =>
//         // Go to url for publication information
//         axios(result.url)
//           .then(response => setPublicationsList(searches => [...searches, response.data]))
//       ))
//       .catch(console.error)
//       .finally(setLoading(false))
//   }
//   // Filter out publications with no issues.
//   const filteredPublicationList = publicationsList.filter((publicationsList) =>
//     publicationsList.issues.length !== 0,
//   )

//   // const emptyPublicationList = publicationsList.filter((publicationsList) =>
//   //   publicationsList.issues.length === 0
//   // )

//   // Map the return of publications from search query
//   const filteredListJsx = filteredPublicationList.map((issues, index) =>
//   <Grid key={index} item xs={12} sm={6} md={6}>
//     <Card className={classes.main}>
//       <CardContent>
//         <Typography variant="h5" component="h2">
//           {issues.name}
//         </Typography>
//         <Divider />
//         <Typography className={classes.pop} color="textSecondary">
//           {issues.place_of_publication}
//         </Typography>
//         <Typography variant="body1" component="p">
//           Start Year: <i>{issues.start_year}</i>
//           <br />
//           End Year: <i>{issues.end_year}</i>
//         </Typography>
//       </CardContent>
//         {/* <CardActions> */}
//           <ToggleButton
//             value="check"
//             className={classes.submitPublicationButton}
//             selected={(selected.includes(index))}
//             onChange={() => {
//               // mappedIndex is "index"
//               // If Selected array includes mappedIndex
//               if (selected.includes(index)) {
//                 // Find mappedIndex's index within Selected array
//                 const i = selected.indexOf(index)
//                 const p = publications.indexOf(issues.url)
//                 // Remove mappedIndex from Selected array by slicing before mappedIndex and after mappedIndex
//                 setSelected(prevArray => [...prevArray.slice(0, i), ...prevArray.slice(i + 1)])
//                 setPublications(prevArray => [...prevArray.slice(0, p), ...prevArray.slice(p + 1)])
//               } else {
//                 // Otherwise, added mappedIndex to Selected
//                 setSelected(prevArray => [...prevArray, index])
//                 setPublications(prevArray => [...prevArray, issues.url])
//               }
//             }}
//           >
//             <AddBoxIcon />
//             Add to List
//           </ToggleButton>
//           {/* <Button variant="outlined" color="secondary">
//             <s>Add to Collection</s> (TBA)
//           </Button> */}
//         {/* </CardActions> */}
//       </Card>
//     </Grid>
//   )

//   console.log(filteredListJsx)

//   //  If user selects a publication - redirect
//   if (submittedAll) {
//     return <Redirect to={{
//       pathname: '/search-publication-issues',
//       state: { url: publications }
//     }} />
//   }

//   return (
//     <div style={{textAlign:'center'}}>

//       <Card className={classes.main} variant="outlined">
//         <CardContent>
//           <Typography className={classes.title} color="textSecondary" gutterBottom>
//             Instructions
//           </Typography>
//           <Typography variant="h5" component="h2">
//             Search by Publication Title
//           </Typography>
//           <Typography className={classes.pos} color="textSecondary">
//             Note: Spaces are not allowed - Use &quot;+&quot;
//           </Typography>

//           {/* Search Form w/ Autocomplete */}
//           <form onSubmit={handleSearchSubmit}>
//             <Autocomplete
//               value={value}
//               onChange={(event, newValue) => {
//                 setValue(newValue);
//               }}
//               inputValue={inputValue}
//               onInputChange={(event, newInputValue) => {
//                 setInputValue(newInputValue);
//                 setSearch(newInputValue)
//               }}
//                 options={suggestedSearchs}
//                 getOptionLabel={(option) => option.search}
//                 id="search-publications"
//                 renderInput={(params) => <TextField {...params} xs={3} label="Enter Search Terms" helperText="term1+term2" margin="normal" onChange={handleChange} />}
//               />
//             <Button className={classes.searchButton} variant="outlined" color="primary" type="submit">Search</Button>
//           </form>
//           <Paper elevation={0} className={classes.showResults}>
//             {(submittedSearch && <h3>Showing Results for: &quot;{submittedSearch}&quot;</h3> )}
//             {(submittedSearch && <h3>Number of Publications: <i>{filteredPublicationList.length}</i></h3> )}
//           </Paper>
//           <CardActions className={classes.searchButton}>
//             {(submittedSearch && <Button onClick={() => setSubmittedAll(true)} variant="outlined" color="secondary" disableElevation className={classes.submitPublicationButton}>Submit Selected Publications</Button>)}
//           </CardActions>
//         </CardContent>
//       </Card>
//       <Grid container spacing={3}>

//       {/* If loading, render skeletons */}
//       {loading ? (
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//           <Grid item xs={12} sm={6} md={6}>
//             <Skeleton height={200} className={classes.skeleton} />
//           </Grid>
//         </Grid>
//       ) : filteredListJsx}
//       </Grid>
//       {/* <Jsx /> */}
//       {/* {((loading === false && submittedSearch && emptyPublicationList.length === 0) && Jsx )} */}
//     </div>
//   )
// }
