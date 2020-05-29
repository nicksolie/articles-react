import React from 'react'
// import Card from 'react-bootstrap/card'
// import CardDeck from 'react-bootstrap/CardDeck'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        justify: 'center',
    },
    card: {
        
    },
    header: {
        textAlign: 'center',
        marginTop: '13px',
        marginBottom: '25px',
    }
  }))

const Home = () => {
    const classes = useStyles();
    
    return (
        <div>
            <Typography className={classes.header} variant="h4" gutterBottom>
                <u>Home</u>
            </Typography>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>

                        <Card className={classes.card}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Search by Publication Name
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" disableElevation size="small" href="#search-publication">
                                Start Here
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            Search the Awardees
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" disableElevation size="small">
                                TBA
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Search by State
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" disableElevation size="small">
                                    TBA
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                View Collections
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" disableElevation size="small" href="#collections">
                               View Your Collections
                                </Button>
                                <Button variant="contained" disableElevation size="small">
                                View Ours (TBA)
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card className={classes.card}>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                View Entries
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" disableElevation size="small" href="#entries">
                               View Your Entries
                                </Button>
                                <Button variant="contained" disableElevation size="small">
                                View Ours (TBA)
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

// ----------------------------------------------------BOOTSTRAP-----------------------------------------------------
// const cardStyles = {
//     width: '22rem',
//     marginBottom: '28px'
// }

{/* <h1 style={{textAlign: 'center', marginTop: '13px', marginBottom: '25px'}}>Home</h1>
            <CardDeck>
                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>Search by Publication</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Card.Text>
                    <Card.Link href="#search-publication">Start Here</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>Search the Awardees</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </Card.Text>
                    <Card.Link href="#home">TBA</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>Search by State</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus
                    </Card.Text>
                    <Card.Link href="#home">TBA</Card.Link>
                </Card.Body>
                </Card>
            </CardDeck>

            <CardDeck>
            <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>View Collections</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                    </Card.Text>
                    <Card.Link href="#collections">Start Here</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>View Entries</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
                    </Card.Text>
                    <Card.Link href="#entries">Start Here</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>TBA</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    TBA
                    </Card.Text>
                    <Card.Link href="#home">TBA</Card.Link>
                </Card.Body>
                </Card>
            </CardDeck>

            <CardDeck>
                <Card>
                <Card.Header >Today&apos;s Headline</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.{' '}
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                    </blockquote>
                </Card.Body>
                </Card>
            </CardDeck> */}

export default Home