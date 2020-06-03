import React, { useState } from 'react'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Grid } from '@material-ui/core'
// import Paper from '@material-ui/core/Paper'
// import ToggleButton from '@material-ui/lab/ToggleButton'
// import AddBoxIcon from '@material-ui/icons/AddBox'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton'
// import SearchSharpIcon from '@material-ui/icons/SearchSharp';

const useStyles = makeStyles(theme => ({
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
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}))

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Search = (props) => {
  const classes = useStyles()
  const [publications, setPublications] = useState([])
  // const [submittedSelected, setSubmittedSelected] = useState(false)
  // const [selectedIndex, setSelectedIndex] = useState([])
  // const [selectedIssues, setSelectedIssues] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  // const [currentViewIssue, setCurrentView] = useState([])

  // On page load, perform axios call to get queried publications
  if (publications.length === 0) {
    props.location.state.url.forEach(item => (
      axios(item)
        .then(response => setPublications(result => [...result, response.data]))
    ))
  } else if (loading === true) {
    setLoading(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

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

                {/* Modal/Dialog View Button*/}
                <Button variant="outlined" color="primary" onClick={handleClickOpen} >
                  View
                </Button>

                  {/* select toggle */}
                  {/* <ToggleButton
                    value="check"
                    selected={(selectedIndex.includes(index))}
                    onChange={() => {
                      // mappedIndex is "index"
                      // If Selected array includes mappedIndex
                      if (selectedIndex.includes(index)) {
                        // Find mappedIndex's index within Selected array
                        const i = selectedIndex.indexOf(index)
                        const p = publications.indexOf(item)
                        // Remove mappedIndex from Selected array by slicing before mappedIndex and after mappedIndex
                        setSelectedIndex(prevArray => [...prevArray.slice(0, i), ...prevArray.slice(i + 1)])
                        setSelectedIssues(prevArray => [...prevArray.slice(0, p), ...prevArray.slice(p + 1)])
                      } else {
                        // Otherwise, added mappedIndex to Selected
                        setSelectedIndex(prevArray => [...prevArray, index])
                        setSelectedIssues(prevArray => [...prevArray, item])
                      }
                    }}
                  >
                    <AddBoxIcon style={{ fontSize: 40 }}/>
                  </ToggleButton> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
          </Grid>
        </Typography>

      </CardContent>
    </Card>
  ))

  // console.log('currentViewIssue is', currentViewIssue )

  // // Redirect if selected issues is clicked
  // if (submittedSelected) {
  //   return <Redirect to={{
  //     pathname: '/search-publication-selected-results',
  //     state: { url: selectedIssues }
  //   }} />
  // }

  return (
    <div>

       <div>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Modal title
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="80%" />
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <h1>Availible Issues</h1>
      <p>Below are the issues corresponding to your submission! Select from the presented issues to view their records. </p>
      {/* <div className={classes.showResults}> */}
        {/* <Paper elevation={1}>
        {(selectedIssues && <Button onClick={() => setSubmittedSelected(true)} variant="contained" color="secondary" disableElevation className={classes.submitPublicationButton}>Submit Selected</Button>)}
        </Paper> */}
      {/* </div> */}
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
        ) : publicationsJsx}
        </Grid>
    </div>
  )
}

export default Search
