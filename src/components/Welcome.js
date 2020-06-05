import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign:'center',
    flexGrow: 1,
  },
  pagination: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    justifyContent:'center',
    display:'flex',
    marginBottom:'20px'
    },
  },
  titleCard: {
    marginTop:'4%',
    paddingBottom:'15px',
    minHeight: 220,
  },
  card: {
    minHeight: 235,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

// const pdfs = ["https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf", "https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479205/1900010501/0016.pdf"]

const Welcome = () => {
  const classes = useStyles()

  return (
    <div className={classes.root} >
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Card className={classes.titleCard}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                This site is a work in progress
              </Typography>
              <Typography variant="h5" component="h2">
                Welcome!
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                This site provides.... blah blah......blah blah blah..... add this, add that.... please see below for more information.
              </Typography>
            </CardContent>
              <Button size="small" variant="contained" href="https://github.com/nicksolie/articles-react" color="primary" disableElevation>GitHub</Button>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  About the site
                </Typography>
                <Typography variant="h5" component="h2">
                  Why this site?
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Please sign in to access the site.
                </Typography>
                <Typography variant="body2" component="p">
                  This site provides.... blah blah......blah blah blah..... add this, add that.... please see below for more information.
                </Typography>
              </CardContent>
            </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  View Examples
                </Typography>
                <Typography variant="h5" component="h2">
                  What does this site provide access to?
                </Typography>
                <Typography className={classes.pos} color="textSecondary">

                </Typography>
                <Typography variant="body2" component="p">
                  Below is an example of a newpaper you can find by querying Chronicling America.

                </Typography>
              </CardContent>
              {/* <Button size="small" variant="outlined" onClick={handleClickOpen('paper')} disableElevation>View</Button> */}
            </Card>
        </Grid>

        <Grid item xs={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Expansion Panel 1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Expansion Panel 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <p>
                <embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="800" />
                </p>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Expansion Panel</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          {/* <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                This site is a work in progress
              </Typography>
              <Typography variant="h5" component="h2">
                What is to come
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                1. feature
                <br />
                2. feature
                <br />
                3. feature
                <br />
                4. feature
              </Typography>
            </CardContent>
          </Card> */}
        </Grid>
      </Grid>
      
      {/* <h1 style={{marginTop:'3%', marginBottom:'2%'}}>Welcome!</h1> */}
      {/* <h3>Please login to use site!</h3> */}
      {/* <h5 style={{marginTop:'4%', marginBottom:'2%'}}>Below is an example of a newpaper you can find by querying Chronicling America.</h5> */}
      {/* <div className={classes.pagination}>
        <Pagination count={pdfs.length} page={page} onChange={handleChange} />
        <Typography> <embed src={pdfs[page - 1]} type="application/pdf" height="600" width="80%" /></Typography>
      </div> */}
      {/* <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="80%" /></p> */}
    </div>
  )
}

export default Welcome
