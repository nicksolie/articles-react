import React, { useState } from 'react'
import { Button, Card, Col, Divider, Modal, Pagination, Row, Space, Timeline } from 'antd'
// import '../index.scss'

const urls =["https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf", "https://chroniclingamerica.loc.gov/data/batches/vi_manowar_ver01/data/sn84024738/00202191058/1859101801/0372.pdf"]

const Welcome = () => {
// Directly changing the dom, material-ui seems to be affecting the ability to change the body
document.body.style.background = 'url(https://source.unsplash.com/dsvJgiBJTOs/) no-repeat center center fixed'
document.body.style.backgroundSize = 'cover'
const [visible, setVisible] = useState(false)
const [current, setCurrent] = useState(1)

// Styles for div container
// const styles = {
//   // marginTop: '15%'
// }

const showModal = () => {
  setVisible(true)
}

const handleOk = () => {
  setVisible(false)
}

const handleCancel = () => {
  setVisible(false)
}

const onPaginationChange = page => {
  console.log(page)
  setCurrent(page)
}


// Meta content for Card
const { Meta } = Card

  return (
      <Row type="flex" justify="center" style={{ alignItems: "center", height:'100vh' }}>
        <Col xs={24} md={12}>
          <Card style={{textAlign: 'center'}}>
            <Meta
              title="Welcome!"
              description="Articles is a platform to view archived newspapers and other historical content from the Library of Congress. Please note, this website it optimized for Chrome."
              style={{textAlign: 'center'}}
            />
            <Row style={{marginTop:'20px', alignItems: 'center'}} justify={"center"}>
              <Space>
                <Button  type="primary" size="large" href="#entry" >Get Started</Button>
                <Button size="large" onClick={showModal}>View Examples</Button>
              </Space>
            </Row>
            <Divider style={{marginTop:'25px', marginBottom:'30px'}}></Divider>
            <p style={{fontWeight: '500', fontSize: '16px'}}>Roadmap</p>
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
         <Modal
          title="Some of my favorites"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          keyboard={true}
          mask={true}
          width={"90%"}
          style={{textAlign: 'center'}}
        >
          <div style={{ overflow: 'scroll' }}>
            <Pagination current={current} onChange={onPaginationChange} total={50} style={{marginBottom:'7px'}}/>
            <iframe src={urls[current-1]} type="application/pdf" frameBorder="0" height="600" width="90%" style={{marginTop: '7px'}}/>
            {/* <p><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="100%" /></p> */}
          </div>
        </Modal>
      </Row>
  )
}

  {/* <p style={{marginTop:'3%'}, styles}><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="600" width="80%" /></p> */}
// const pdfs = ["https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf", "https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479205/1900010501/0016.pdf"]

export default Welcome
