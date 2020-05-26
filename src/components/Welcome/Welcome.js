import React from 'react'
import styles from './../../index.scss'
// import { Document, Page } from 'react-pdf'
// import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'

const Welcome = () => {
  return (
    <div style={{textAlign:'center'}}>
      <h1 style={{marginTop:'3%', marginBottom:'2%'}}>Welcome!</h1>
      <h3>Please login to use site (please avoid real emails for security reasons)!</h3>
      <h5 style={{marginTop:'4%', marginBottom:'2%'}}>Below is an example of a newpaper you can find by querying Chronicling America.</h5>
      <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="500" width="55%" /></p>
      <h4>You can read more about the site <a href="https://github.com/nicksolie/articles-react/blob/master/README.md" Adding rel="noopener noreferrer" target="_blank">here</a>.</h4>
    </div>
  )
}

// No styling
{/* <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="500px" width="80%" /></p> */}

// React PDF
{/* <Document file="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf">
<Page height={500} pageNumber={1} />
</Document> */}

export default Welcome
