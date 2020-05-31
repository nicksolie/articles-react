import React, { useState } from 'react'
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination'

const SearchPublicationResults = (props) => {
    const [pdfs, setPdfs] = useState([])
    // const [pdfs] = useState([])
    const [page, setPage] = React.useState(1)

    //  Take submitted urls and find their pdfs
    if (pdfs.length === 0) {
        props.location.state.url.map(publication => (
            publication.issues.map(issue => (
                axios(issue.url)
                    .then(response => response.data.pages.map(page => (
                        axios(page.url)
                            .then(response => setPdfs(pdf => [...pdf, response.data.pdf]))
                    )))
            ))
        ))
    }



    const handleChange = (event, value) => {
        setPage(value);
      }


    return (
        <div>
            <h1>Your results</h1>
            <p><embed src={pdfs} type="application/pdf" height="600" width="80%" /></p>
            <Pagination count={10} page={page} onChange={handleChange} />
        </div>
    )
}

// ---------------------------------Broken Index All---------------------------------------
// const [pdfs, setPdfs] = useState([])

// if (pdfs.length === 0) {
//     props.location.state.url.map(publication => (
//         publication.issues.map(issue => (
//             axios(issue.url)
//                 .then(response => response.data.pages.map(page => (
//                     axios(page.url)
//                         .then(response => setPdfs(pdf => [...pdf, response.data.pdf]))
//                 )))
//         ))
//     ))
// }

// const pdfsJsx = pdfs.map((pdf, index) => (
//     <p key={index}><embed src={pdf} type="application/pdf" height="600" width="80%" /></p>
// ))

// console.log(pdfs)
// --------------------------------------------------------------------------------------


export default SearchPublicationResults