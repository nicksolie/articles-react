import React, { useState, useEffect }from 'react'
import { Breadcrumb, Button, Card, Col, Modal, Row, Skeleton } from 'antd';
import axios from 'axios';

const SearchPublicationIssues = (props) => {
  const publication = props.location.state.publication
  const issues = props.location.state.publication.issues
  const [visible, setVisible] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState([])
  const [issueData, setIssueData] = useState([])
  const [sortedIssueData, setSortedIssueData] = useState([])
  const [loading, setLoading] =useState(false)
  const [firstIssueDate, setFirstIssueDate] = useState({})
  
  if (loading) {
    setFirstIssueDate(selectedIssue)
    axios(selectedIssue.url)
    .then(response => response.data.pages.map(page => (
      axios(page.url)
        .then(response => setIssueData(page => [...page, response.data]))
        .catch()
        .then(setSelectedIssue([]))
    )))
    setLoading(false)
  }

  const showModal = () => {
    setVisible(true)
  }
  
  const handleOk = () => {
    setVisible(false),
    setIssueData([])
  }
  
  const handleCancel = () => {
    setVisible(false),
    setIssueData([])
  }

  // Jsx for mapped issues
  const issuesJsx = issues.map((issue, index) => (
    <Col key={index} xs={12} sm={8} md={4}>
      <Card
      actions={[
        <Button size="small" key="index" onClick={() => {setSelectedIssue(issue), showModal(), setLoading(true)}}>View</Button>
      ]}
      >
        {issue.date_issued}
      </Card>
    </Col>
    
  ))

  useEffect(() => (
    setSortedIssueData(issueData.sort((a, b) => a.sequence - b.sequence))
  ))

  const modalJsx = sortedIssueData.map((page, index) => (
    <Card key={index} style={{textAlign:'center'}}>
      {sortedIssueData ? (<p>Page: {page.sequence}</p>, <iframe src={page.pdf} type="application/pdf" height="800" width="90%" frameBorder="0" />) : <Skeleton/> }
      {/* // <p>Page: {page.sequence}</p> */}
      {/* // <iframe src={page.pdf} type="application/pdf" height="800" width="100%" frameBorder="0" /> */}
    </Card>
  ))

  const pageLength = issueData.length > 0 ? <p>There are {issueData.length} archived pages.</p> : <p></p>
  const skeletonJsx = (issueData.length === 0 && (<p>Loading..</p>, <Skeleton paragraph={{ rows: 10 }} active/>))

  console.log('publication:', publication)
  console.log('issueData', issueData)
  console.log('loading', loading)
  console.log('sorted', sortedIssueData)
  console.log('firstIssueDate', firstIssueDate)

  return (
    <div>
      <Breadcrumb style={{marginTop: '20px', marginBottom: '20px'}} >
        <Breadcrumb.Item><a href="#home">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="#search-publication">Search Publications</a></Breadcrumb.Item>
        <Breadcrumb.Item>View Issues</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Availible Issues</h1>
      <p>Below are the issues corresponding to your submission! Select from the presented issues to view their records.</p>
        <h6>{publication.name}</h6>
        <p>Origin: {publication.place_of_publication}</p>
        <p>Start year: {publication.start_year}</p>
        <p>End Year: {publication.end_year}</p>
        <Row gutter={[16, 16]}>
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose={true}
          width={"90%"}
        >
          {({firstIssueDate} && <h6><u>Issue: {firstIssueDate.date_issued}</u></h6>)}
          {pageLength}
          {skeletonJsx}
          {modalJsx}
        </Modal>
          {issuesJsx}
        </Row>
    </div>
  )
}

export default SearchPublicationIssues

