import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row, Space, Timeline } from 'antd'
import { Divider } from '@material-ui/core'

const Welcome = () => {
// Directly changing the dom, material-ui seems to be affecting the ability to change the body
document.body.style.background = 'url(https://source.unsplash.com/dsvJgiBJTOs/) no-repeat center center'
document.body.style.backgroundSize = 'cover'
const [visible, setVisible] = useState(false)

// Styles for div container
const styles = {
  marginTop: '15%'
}

const showModal = () => {
  setVisible(true)
}

const handleOk = () => {
  setVisible(false)
}

const handleCancel = () => {
  setVisible(false)
}

// Meta content for Card
const { Meta } = Card

  return (
    <div style={styles}>
      <Row justify={"center"}>
        <Col xs={12}>
          <Card style={{textAlign: 'center'}}>
            <Meta
              title="Welcome!"
              description="Articles is a platform to view archived newspapers and other historical content."
              style={{textAlign: 'center'}}
            />
            <Row style={{marginTop:'20px', alignItems: 'center'}} justify={"center"}>
              <Space>
                <Button  type="primary" size="large" href="#sign-in" >Get Started</Button>
                <Button style={{backgroundColor: '#4CAF50'}} size="large" type="primary" onClick={showModal}>View Examples</Button>
              </Space>
            </Row>
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
      <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
    </div>
  )
}

  {/* <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="80%" /></p> */}
// const pdfs = ["https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf", "https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479205/1900010501/0016.pdf"]

export default Welcome
