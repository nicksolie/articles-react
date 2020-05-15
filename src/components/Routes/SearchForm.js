// import React from 'react'
import React, { useState } from 'react'
import axios from 'axios'

const SearchForm = () => {
  const [search, setSearch] = useState({
    keyword1: ''
  })
  const [url] = useState([])
  const handleChange = event => {
    event.persist()
    setSearch(search => (event.target.value))
  }
  // const handleSubmit = event => {
  //   event.preventDefault()
  //   axios(`https://chroniclingamerica.loc.gov/search/titles/results/?terms=${search}&format=json`)
  //   // axios('https://chroniclingamerica.loc.gov/lccn/sn87056230.json')
  //     // .then(response => console.log(response))
  //     .then(response => response.data.items)
  //     .then(items => items.forEach(item => (
  //       axios(item.url)
  //         // .then(response => setUrl(url => [...url, response.item]))
  //         .then(item => console.log(item.data.url))
  //     )))
  //     .catch(console.error)
  // }

  const handleSubmit = event => {
    event.preventDefault()
    axios('http://chroniclingamerica.loc.gov/suggest/titles/?q=bourbon+news&format=json')
      .then(response => console.log(response))
  }

  // const urlJsx = url.map(data =>
  //   <p key={data.id}>{data.url}</p>
  // )
  console.log('url is', url)
  console.log('search is', search)

  return (
    <div>
      <h1>Enter key words</h1>
      <form onSubmit={handleSubmit}>
        <label>Input word 1</label>
        <input
          placeholder="word 1"
          name="word1"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      <h3>results</h3>
    </div>
  )
}

export default SearchForm
