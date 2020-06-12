import React from 'react'
import { Button, Card, Col, Row, Timeline } from 'antd'
import { Divider } from '@material-ui/core'

const Welcome = () => {
// Directly changing the dom, material-ui seems to be affecting the ability to change the body
document.body.style.background = 'url(https://source.unsplash.com/GWOTvo3qq7U/) no-repeat center center fixed'
document.body.style.backgroundSize = 'cover' 

const styles = {
  // textAlign: 'center',
  marginTop: '15%'
}

const { Meta } = Card

  return (
    <div style={styles}>
      <Row justify={"center"} align={"bottom"} >
        <Col xs={12}>
          <Card style={{textAlign: 'center'}}>
            <Meta
              title="Welcome!"
              description="Articles is a platform to view archived newspapers and other historical content."
              style={{textAlign: 'center'}}
            />
            <Button style={{marginTop:'20px', alignItems: 'center'}}type={"primary"} size={"large"} href="#sign-in" >Get Started</Button>
            <Divider style={{marginTop:'25px', marginBottom:'30px'}}></Divider>
            <p style={{fontWeight: '500', fontSize: '16px'}}>Timeline</p>
            <Timeline style={{textAlign: 'left'}} mode={'left'}>
              <Timeline.Item color='green'>Search by Publication Title</Timeline.Item>
              <Timeline.Item>Generate Entries to Store Publications</Timeline.Item>
              <Timeline.Item>View and Create Collections of Entries</Timeline.Item>
              <Timeline.Item color='grey'>Search Publications by State</Timeline.Item>
              <Timeline.Item color='grey'>Search Archived Photos</Timeline.Item>
              <Timeline.Item color='grey'>Search Archived Radio Clips</Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

  {/* <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="80%" /></p> */}
// const pdfs = ["https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf", "https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479205/1900010501/0016.pdf"]

export default Welcome
