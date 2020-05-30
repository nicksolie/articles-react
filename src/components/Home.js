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
                                    Your Collections
                                </Button>
                                <Button variant="contained" disableElevation size="small">
                                    Ours (TBA)
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
                                    Your Entries
                                </Button>
                                <Button variant="contained" disableElevation size="small">
                                    Ours (TBA)
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Home