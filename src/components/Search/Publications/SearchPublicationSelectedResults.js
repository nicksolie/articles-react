import React, { useState } from 'react'
import axios from 'axios'

const SearchPublicationSelectedResults = (props) => {
    // const [sentIssuesUrls, setSentIssuesUrls] = useState([])
    const [sentIssuesUrls] = useState([])

    if (sentIssuesUrls.length === 0) {
        props.location.state.url.map(toIssueUrl => (
            axios(toIssueUrl.url)
                // set URLS HERE or??? Map again to see pages right away
                // .then(response => setSentIssuesUrls(response.data))
                .then(response => console.log(response.data))
                )
        )
    }

    console.log(sentIssuesUrls)

    return (
        <h1>Your Selected Results</h1>
    )
}

export default SearchPublicationSelectedResults