import React, { useState, useEffect }from 'react'
import { Breadcrumb, Button, Card, Col, Modal, Row } from 'antd';
import axios from 'axios';

const SearchPublicationIssues = (props) => {
  const publication = props.location.state.publication
  const issues = props.location.state.publication.issues
  const [visible, setVisible] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState([])
  const [issueData, setIssueData] = useState([])
  const [sortedIssueData, setSortedIssueData] = useState([])
  const [loading, setLoading] =useState(false)
  const [firstIssueDate, setFirstIssueDate] = useState({})
  
  if (loading) {
    setFirstIssueDate(selectedIssue)
    axios(selectedIssue.url)
    .then(response => response.data.pages.map(page => (
      axios(page.url)
        .then(response => setIssueData(page => [...page, response.data])) 
        .then(setSelectedIssue([]))
    )))
    setLoading(false)
  }

  const showModal = () => {
    setVisible(true)
  }
  
  const handleOk = () => {
    setVisible(false),
    setSelectedIssue([])
    setIssueData([]),
    setLoading(false)
  }
  
  const handleCancel = () => {
    setVisible(false),
    setSelectedIssue([])
    setIssueData([]),
    setLoading(false)
  }

  // Jsx for mapped issues
  const issuesJsx = issues.map((issue, index) => (
    <Col key={index} xs={12} sm={8} md={4}>
      <Card
      actions={[
        <Button size="small" key="index" onClick={() => {setSelectedIssue(issue), showModal(), setLoading(true)}}>View</Button>
      ]}
      >
        {issue.date_issued}
      </Card>
    </Col>
    
  ))

  useEffect(() => (
    setSortedIssueData(issueData.sort((a, b) => a.sequence - b.sequence))
  ))

  const modalJsx = sortedIssueData.map((page, index) => (
    <Card key={index}>
      <p>Page: {page.sequence}</p>
      <iframe src={page.pdf} type="application/pdf" height="800" width="100%" frameBorder="0" />
    </Card>
  ))

  const pageLength = issueData.length > 0 ? <p>There are {issueData.length} archived pages.</p> : <p></p>

  console.log('publication:', publication)
  console.log('issueData', issueData)
  console.log('loading', loading)
  console.log('sorted', sortedIssueData)
  console.log('firstIssueDate', firstIssueDate)

  return (
    <div>
      <Breadcrumb style={{margin: '30px'}} >
        <Breadcrumb.Item><a href="#home">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="#search-publication">Search Publications</a></Breadcrumb.Item>
        <Breadcrumb.Item>View Issues</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Availible Issues</h1>
      <p>Below are the issues corresponding to your submission! Select from the presented issues to view their records.</p>
        <h6>{publication.name}</h6>
        <p>Origin: {publication.place_of_publication}</p>
        <p>Start year: {publication.start_year}</p>
        <p>End Year: {publication.end_year}</p>
        <Row gutter={[16, 16]}>
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose={true}
          width={"90%"}
        >
          {({firstIssueDate} && <h6>Issue: {firstIssueDate.date_issued}</h6>)}
          {pageLength}
          {modalJsx}
        </Modal>
          {issuesJsx}
        </Row>
    </div>
  )
}

export default SearchPublicationIssues

// ------------------------------------------------------------------------------------------

// import React, { useState } from 'react'
// import axios from 'axios'
// // import { Redirect } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
// import CardActions from '@material-ui/core/CardActions'
// import Typography from '@material-ui/core/Typography'
// import Divider from '@material-ui/core/Divider'
// import { Grid } from '@material-ui/core'
// import ToggleButton from '@material-ui/lab/ToggleButton'
// import AddBoxIcon from '@material-ui/icons/AddBox'
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Skeleton from '@material-ui/lab/Skeleton'
// import TablePagination from '@material-ui/core/TablePagination';

// const useStyles = makeStyles(theme => ({
//   card: {
//     minWidth: 275,
//     marginBottom:'20px',
//   },
//   title: {
//     fontSize: 14,
//   },
//   issues: {
//     justifyContent:'center',
//     marginBottom:'10px',
//   },
//   showResults: {
//     bottomMargin:'20px',
//   },
//   paper: {
//     position: 'absolute',
//     width: 400,
//     // backgroundColor: theme.palette.background.paper,
//     border: '2px solid #000',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   }
// }))

// const Search = (props) => {
//   const classes = useStyles()
//   const [publications, setPublications] = useState([])
//   const [selectedIndex, setSelectedIndex] = useState([])
//   const [open, setOpen] = useState(false)
//   const [scroll, setScroll] = useState('paper');
//   const [loading, setLoading] = useState(true)
//   const [currentViewIssue, setCurrentViewIssue] = useState([])
//   const [issuePageData, setIssuePageData] = useState([])

//   const [page, setPage] = React.useState(2);
//   const [rowsPerPage, setRowsPerPage] = React.useState(1);

//   // On page load, perform axios call to get queried publications
//   if (publications.length === 44) {
//     props.location.state.url.forEach(item => (
//       axios(item)
//         .then(response => setPublications(result => [...result, response.data]))
//     ))
//   } else if (loading === true) {
//     setLoading(false)
//   }

//   // Dialog open function
//   const handleClickOpen = (scrollType) => () => {
//     setOpen(true);
//     setScroll(scrollType);
//     currentViewIssue.map((issue) => (
//       axios(issue)
//         .then(response => response.data.pages.map((issuePage) => (
//           axios(issuePage.url)
//             .then(response => setIssuePageData(page => [...page, response]))
//         )))
//     ))
//   };

//   // Dialog Close function
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const descriptionElementRef = React.useRef(null);
//   React.useEffect(() => {
//     if (open) {
//       const { current: descriptionElement } = descriptionElementRef;
//       if (descriptionElement !== null) {
//         descriptionElement.focus();
//       }
//     }
//   }, [open]);

//   // Jsx for mapped issues
//   const publicationsJsx = publications.map((publication, index) => (
//     <Card key={index} className={classes.card}>
//       <CardContent>
//         <Typography className={classes.title} color="textSecondary" gutterBottom>
//           Publication: {index + 1}
//         </Typography>
//         <Typography variant="h5" component="h2">
//           {publication.name}
//         </Typography>
//         <Divider light />

//         {/* Publication details */}
//         <Typography className={classes.pos} color="textSecondary">
//         Place of Publication: {publication.place_of_publication}
//         <br />
//         Start Year: <i>{publication.start_year}</i>
//         <br />
//         End Year: <i>{publication.end_year}</i>
//         <br />
//         Number of Issues: <i>{publication.issues.length}</i>
//         <br />

//         {/* Modal/Dialog View Button*/}
//         <Button variant="outlined" color="primary" onClick={handleClickOpen('paper')}>
//           View Selected
//         </Button>

//         </Typography>
//         <Divider light />

//         {/* Index of all issues in plublication */}
//         <Typography className={classes.issues} variant="body2" component="div">
//         <Grid container spacing={3}>
          
//           {publication.issues.map((item, index) => (
//             <Grid key={index} item xs={12} sm={6}>
//               <Card  className={classes.root}>
//                 <CardContent>
//                   <Typography className={classes.title} color="textSecondary" gutterBottom>
//                     Issue: {index + 1}
//                   </Typography>
//                   <Typography variant="h5" component="h2">
//                     Issue Date: {item.date_issued}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>

//                   {/* select toggle */}
//                   <ToggleButton
//                     value="check"
//                     selected={(selectedIndex.includes(index))}
//                     onChange={() => {
//                       // mappedIndex is "index"
//                       // If Selected array includes mappedIndex
//                       if (selectedIndex.includes(index)) {
//                         // Find mappedIndex's index within Selected array
//                         const i = selectedIndex.indexOf(index)
//                         const p = currentViewIssue.indexOf(item.url)
//                         // Remove mappedIndex from Selected array by slicing before mappedIndex and after mappedIndex
//                         setSelectedIndex(prevArray => [...prevArray.slice(0, i), ...prevArray.slice(i + 1)])
//                         setCurrentViewIssue(prevArray => [...prevArray.slice(0, p), ...prevArray.slice(p + 1)])
//                         console.log(item.url)
//                       } else {
//                         // Otherwise, added mappedIndex to Selected
//                         setSelectedIndex(prevArray => [...prevArray, index])
//                         setCurrentViewIssue(prevArray => [...prevArray, item.url])
//                       }
//                     }}
//                   >
//                     <AddBoxIcon style={{ fontSize: 40 }}/>
//                   </ToggleButton>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//           </Grid>
//         </Typography>

//       </CardContent>
//     </Card>
//   ))


//   const dialogJsx = issuePageData.map((page) => (
//     <div key={page.data.sequence}>
//       {page.data.issue.date_issued}
//       <embed src={page.data.pdf} type="application/pdf" height="900" width="90%" />
//     </div>
//   )) 

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   }

//   return (
//     <div>

//        <div>
//         <Dialog
//           fullWidth={true}
//           maxWidth="lg"
//           open={open}
//           onClose={handleClose}
//           scroll={scroll}
//           aria-labelledby="issue-dialog-title"
//           aria-describedby="issue-dialog-description"
//         >
//           <DialogTitle id="issue-dialog-title">Availible Pages</DialogTitle>
//           <DialogContent dividers={scroll === 'paper'}>
//             <DialogContentText
//               id="issue-dialog-description"
//               ref={descriptionElementRef}
//               tabIndex={-1}
//             > 
//             </DialogContentText>
//             <TablePagination
//                 component="div"
//                 count={issuePageData.length}
//                 page={page}
//                 onChangePage={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onChangeRowsPerPage={handleChangeRowsPerPage}
//               />
//             {dialogJsx}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleClose} color="primary">
//               Add to Collection
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>

//       <h1>Availible Issues</h1>
//       <p styling={{marginBottom:'20px'}}>Below are the issues corresponding to your submission! Select from the presented issues to view their records. </p>
//       <Grid container spacing={3}>

//         {/* If loading, render skeletons */}
//         {loading ? (
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6}>
//               <Skeleton height={200} className={classes.skeleton} />
//             </Grid>
//           </Grid>
//         ) : publicationsJsx}
//         </Grid>
//     </div>
//   )
// }

// export default Search
