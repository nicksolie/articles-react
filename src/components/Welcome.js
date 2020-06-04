import React from 'react'
// import styles from './../index.scss'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    justifyContent:'center',
    display:'flex',
    marginBottom:'20px'
    },
  },
}));

const pdfs = ["https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf", "https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479205/1900010501/0016.pdf"]

const Welcome = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div style={{textAlign:'center'}} >
      <h1 style={{marginTop:'3%', marginBottom:'2%'}}>Welcome!</h1>
      <h3>Please login to use site!</h3>
      <h5 style={{marginTop:'4%', marginBottom:'2%'}}>Below is an example of a newpaper you can find by querying Chronicling America.</h5>
      <div className={classes.root}>
        <Pagination count={pdfs.length} page={page} onChange={handleChange} />
        <Typography> <embed src={pdfs[page - 1]} type="application/pdf" height="600" width="80%" /></Typography>
      </div>
      {/* <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="80%" /></p> */}
      <h4>You can read more about the site <a href="https://github.com/nicksolie/articles-react/blob/master/README.md" rel="noopener noreferrer" target="_blank">here</a>.</h4>
    </div>
  )
}

export default Welcome
