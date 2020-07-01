import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { AutoComplete, Breadcrumb, Button, Card, Col, Empty, Form, Row } from 'antd'
// import newspaperIndex from '../../newspaperIndex'

const suggestedSearches = [
  { value: 'Washington' },
  { value: 'Toiler' },
  { value: 'New+York'},
  { value: 'Ohio'},
  { value: 'New+Mexico'},
  { value: 'Bourbon+News' }
]

const SearchPublications = () => {
  const [search, setSearch] = useState('')
  const [emptySearchResponse, setEmptySearchResponse] = useState(false)
  const [publicationsList, setPublicationsList] = useState([])
  const [publication, setPublication] = useState([])
  const { Meta } = Card;

  const handleSearchSubmit = () => {
    if (search === '') {
      return
    }
    setEmptySearchResponse(false)
    setPublicationsList([])
    // Add search term to query
    axios(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${search}&format=json`)
      .then((response) => {
        // Check if the response is empty and set error message
        if (response.data.items.length === 0) {
          setEmptySearchResponse(true)
        } else {
          response.data.items.map(result =>
            // Go to url for publication information
            axios(result.url)
              // .then(response => console.log(response.data.issues))
              .then((publication) => {
                if (publication.data.issues.length === 0) {
                  return
                } else {
                  setPublicationsList(publications => [...publications, publication.data])
                }
              })
          )
      }})
      .catch(console.error)
  }

  // Filter out publications with no issues.
  const filteredPublicationList = publicationsList.filter((publicationsList) =>
    publicationsList.issues.length !== 0,
  )

  const filteredListJsx = filteredPublicationList.map((publication, index) =>
    <Col key={index} xs={24} sm={12} order={index}>
      <Card title={publication.name}
      actions={[
        <Button onClick={() => setPublication(publication)} key="view">View</Button>,
        ]}
      style={{marginTop: '30px', border: 'black solid 0.1px'}}
      >
        <p>{publication.place_of_publication}</p>
        <p>Start Year:{publication.start_year}</p>
        <p>End Year: {publication.end_year}</p>
      </Card>
    </Col>
  )


  console.log('publicationsList', publicationsList)

  //  If user selects a publication - redirect
  if (publication.length !== 0) {
    return <Redirect to={{
      pathname: '/search-publication-issues',
      state: { publication: publication }
    }} />
  }

  const handleSearch = (value) => {
    setSearch(value)
  };

  const onSelect = (value) => {
    setSearch(value)
  };

  // const skeletonJsx = (filteredPublicationList && <Skeleton />)

  return (
    <div>
      <Breadcrumb style={{marginTop: '20px', marginBottom: '20px'}}>
        <Breadcrumb.Item><a href="#home">Home</a></Breadcrumb.Item>
        <Breadcrumb.Item>Search Publications</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="center">
        <Col xs={24}>         
          <Card style={{border: 'black solid 0.1px', textAlign: 'center' }}>
            <Meta
              title="Search by Publication Name"
              description="Note: Spaces are not allowed - Use &quot;+&quot;"
            />
            <Form onFinish={() => handleSearchSubmit()} style={{marginTop: '5px'}}>
              <Form.Item>
                <AutoComplete
                  style={{ width: 300, marginRight: '10px' }}
                  placeholder="Example: term1+term2"
                  options={suggestedSearches}
                  onSelect={onSelect}
                  onSearch={handleSearch}
                />
                <Button style={{marginTop: '5px'}} type="primary" htmlType="submit">Search</Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row style={{textAlign: 'center'}} justify="space-around" gutter={{xs: 8, sm: 16, md: 24}}>
          {/* {skeletonJsx} */}
          {filteredListJsx}
          {/* {(emptySearchResponse && <p>No results found. Please try again.</p>)} */}
          {(emptySearchResponse && <Empty style={{marginTop: '30px'}} />)}
      </Row>
    </div>
  )
}

export default SearchPublications  
