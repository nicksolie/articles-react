import React from 'react'
import { Button } from 'antd'

const Welcome = () => {
// Directly changing the dom, material-ui seems to be affecting the ability to change the body
document.body.style.background = 'url(../../images/library.jpg) no-repeat center center fixed'
document.body.style.backgroundSize = 'cover' 

const styles = {
  // backgroundColor: 'rgb(44, 230, 230)',
  // backgroundPosition: 'center',
  // backgroundSize: 'cover',
  // backgroundRepeat: 'no-repeat',
  // minHeight: '100%'
}

  return (
    <div style={styles}>
      <h1>Welcome!</h1>
      <p>Articles is a platform to view archived newspapers and other historical content.</p>
      <Button type={"primary"} size={"large"} href="#sign-in" >Get Started</Button>
    </div>
  )
}

  {/* <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="80%" /></p> */}
// const pdfs = ["https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf", "https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479205/1900010501/0016.pdf"]

export default Welcome
