import React, { useState, useEffect }from 'react'
import { Breadcrumb, Button, Card, Col, Dropdown, Menu, Modal, Row, Skeleton } from 'antd';
import axios from 'axios';
import apiUrl from './../../../apiConfig'
// import IndexCollections from './../../Collections/IndexCollections.js'

const SearchPublicationIssues = (props) => {
  const publication = props.location.state.publication
  const issues = props.location.state.publication.issues
  const [visible, setVisible] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState([])
  const [issueData, setIssueData] = useState([])
  const [sortedIssueData, setSortedIssueData] = useState([])
  const [loading, setLoading] =useState(false)
  const [firstIssueDate, setFirstIssueDate] = useState({})
  const [addToCollection, setAddToCollection] = useState([])
  const [indexedCollectionMenu, setIndexCollectionMenu] = useState([])
  
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

  // Triggle modal display
  const showModal = () => {
    setVisible(true)
  }
  
  // Modal add setting
  const handleAdd = () => {
    // setVisible(false)
  }
  
  // Close modal
  const handleCancel = () => {
    setVisible(false),
    setIssueData([])
  }

  // Start for function to send selected url to selected colleciton
  // const handleCollection = url => {
  //   return axios({
  //     url: apiUrl + '/collections',
  //     method: 'POST',
  //     data: {
  //       credentials: {
  //         email: credentials.email,
  //         password: credentials.password
  //       }
  //     }
  //   })
  // }

  // Jsx for mapped issues
  const issuesJsx = issues.map((issue, index) => (
    <Col key={index} xs={12} sm={8} md={4} style={{textAlign: 'center'}}>
      <Card
      actions={[
        <Button size="small" key="index" onClick={() => {setSelectedIssue(issue), showModal(), setLoading(true)}}>View</Button>,
      ]}
      >
        {issue.date_issued}
      </Card>
    </Col>
    
  ))

  useEffect(() => (
    setSortedIssueData(issueData.sort((a, b) => a.sequence - b.sequence))
  ))
  
  // prevents infinite loop of queries for collections
  if(issueData.length > 0 && indexedCollectionMenu.length === 0) {
    axios(`${apiUrl}/collections`)
    .then(res => setIndexCollectionMenu(res.data.collections))
  }

  const handleIndexMenu = () => {
    console.log('bang')
  }

  // takes indexed collections from backend and maps into an array of Menu.item compenents 
  const menuIndexed = indexedCollectionMenu.map((collection, index) => (
      <Menu.Item key={index} >
        {collection.name}
      </Menu.Item>
  ))
  
  // place indexed collections into JSX for the dropdown
  const menu = (
    <Menu>
      {menuIndexed}
    </Menu>
  )

  // JSX for issue PDFs
  const modalJsx = sortedIssueData.map((page, index) => (
    <Card key={index} style={{textAlign:'center', marginBottom:'15px', position:'relative'}}>
      <p>Page: {page.sequence}</p>
      <Dropdown overlay={menu} onClick={() => setAddToCollection(page.pdf) }>
        <Button type="primary" onClick={() => handleIndexMenu()}>Add to Collection</Button>
      </Dropdown>
      <Card style={{textAlign:'center', height:'200px'}}>
        <p>Test</p>
      </Card>
      {(sortedIssueData && <iframe src={page.pdf} type="application/pdf" height="900" width="90%" style={{marginTop:'10px'}} frameBorder="0" />)}
    </Card>
  ))
9
  // Show page length at top of card when data is done loading
  const pageLength = issueData.length > 0 ? <p>There are {issueData.length} archived pages.</p> : <p></p>
  // Load skeleton while data is loading
  const skeletonJsx = (issueData.length === 0 && (<p>Loading..</p>, <Skeleton paragraph={{ rows: 10 }} active/>))

  // console.log('publication:', publication)
  // console.log('issueData', issueData)
  // console.log('sorted', sortedIssueData)
  // console.log('firstIssueDate', firstIssueDate)
  console.log('To add to collection...', addToCollection)
  console.log('indexed collection', indexedCollectionMenu)
  // console.log('selectedIssue is', selectedIssue)

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
          onOk={handleAdd}
          onCancel={handleCancel}
          destroyOnClose={true}
          width={"90%"}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Back
            </Button>,
            <Button type="primary" key="add" onClick={handleAdd}>
              Add All to Collection
            </Button>
          ]}
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

// const modalJsx = sortedIssueData.map((page, index) => (
//   <Card key={index} style={{textAlign:'center', marginBottom:'15px'}}>
//     <p>Page: {page.sequence}</p>
//     <Dropdown overlay={menu} onClick={() => setAddToCollection(page.pdf) }>
//       <Button type="primary" onClick={() => handleIndexMenu()}>Add to Collection</Button>
//     </Dropdown>
//     {(sortedIssueData && <iframe src={page.pdf} type="application/pdf" height="900" width="90%" style={{marginTop:'10px'}} frameBorder="0" />)}
//   </Card>
// ))

export default SearchPublicationIssues

