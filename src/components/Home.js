import React from 'react'
import { Button, Card, Col, Divider, Row } from 'antd';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Meta } = Card;

const rowStyle = {
    // padding:'8px 0',
    // background:'#00a0e9',
    // minWidth:'350px'
}

const divderStyles = {
    margin:'20px 0'
}

const Home = () => {
    document.body.style.background = 'white' 
    return (
        <div>
            <Divider style={divderStyles} orientation="left">Search</Divider>      
            <Row justify={"center"} gutter={{xs: 8, sm: 16, md: 24}}>
                <Col className={rowStyle} xs={24} sm={12} order={1}>
                    <Card
                        hoverable
                        cover={
                        <img
                            alt="example"
                            src="https://source.unsplash.com/nDku_Hmu6zk/375x250"
                        />
                        }
                        actions={[
                        <Button style={{backgroundColor: '#4CAF50'}} href="#search-publication" type="primary" size="large" key="view">View</Button>,
                        ]}
                    >
                        <Meta
                        title="Search by Publication Title"
                        description="Search through the Library of Congress's database for a specific name of a publication. After finding your publication you view the availible issues."
                        />
                    </Card>
                </Col>
                <Col className={rowStyle} xs={24} sm={12} order={2}>
                    <Card
                        hoverable
                        cover={
                        <img
                            alt="example"
                            src="https://source.unsplash.com/9b6WAnfDfF4/375x250"
                        />
                        }
                        actions={[
                        <Button style={{backgroundColor: '#4CAF50'}} type="primary" key="view">TBA</Button>,
                        ]}
                    >
                        <Meta
                        title="Search by State"
                        description="Search through the Library of Congress's database for a specific name of a publication. After finding your publication you view the availible issues."
                        />
                    </Card>
                </Col>
            </Row>

            <Divider style={divderStyles} orientation="left">View</Divider>
            <Row justify={"center"} gutter={{xs: 8, sm: 16, md: 24}} style={{marginBottom:'20px'}}>
                <Col className={rowStyle} xs={24} sm={12} order={1}>
                    <Card
                        hoverable
                        cover={
                        <img
                            alt="example"
                            src="https://source.unsplash.com/1-29wyvvLJA/375x250"
                        />
                        }
                        actions={[
                        <Button href="#collections" style={{backgroundColor: '#4CAF50'}} type="primary" key="view">View</Button>,
                        <Button href="#collections" style={{backgroundColor: '#4CAF50'}} type="primary" key="view">Create</Button>
                        ]}
                    >
                        <Meta
                        title="Collections"
                        description="View a specific collection, either ours or yours."
                        />
                    </Card>
                </Col>
                <Col className={rowStyle} xs={24} sm={12} order={2}>
                    <Card
                        hoverable
                        cover={
                        <img
                            alt="example"
                            src="https://via.placeholder.com/375x250"
                        />
                        }
                        actions={[
                        <Button href="#entries" style={{backgroundColor: '#4CAF50'}} type="primary" key="view">View</Button>,
                        <Button href="#collections" style={{backgroundColor: '#4CAF50'}} type="primary" key="view">Create</Button>
                        ]}
                    >
                        <Meta
                        title="Entries"
                        description="View a specific entry within a collection."
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Home

// ----------------------------------------Matterial UI-------------------------------------------------

// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles(() => ({
//     root: {
//         flexGrow: 1,
//         justify: 'center',
//     },
//     card: {
        
//     },
//     header: {
//         textAlign: 'center',
//         marginTop: '13px',
//         marginBottom: '25px',
//     }
//   }))

// const classes = useStyles();
{/* <Typography className={classes.header} variant="h4" gutterBottom>
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
                <Button variant="contained" disableElevation href="#search-awardees" size="small">
                Start Here
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
</div> */}