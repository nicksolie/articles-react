// -----------------------------Index ALL pages from query--------------------------------
  // useEffect(() => {
  //   Props... looks like, https://chroniclingamerica.loc.gov/lccn/sn86069872.json
  //   axios(props.location.state.url)
  //     // Filter response down to a issue's pages array
  //     .then(response => response.data.issues)
  //     .then(issues => issues.forEach(result =>
  //       axios(result.url)
  //         .then(response => response.data.pages)
  //         .then(pages => pages.forEach(result => (
  //           axios(result.url)
  //             .then(response => setPdfs(searches => [...searches, response.data]))
  //         )))
  //     ))
  //     // ForEach page, make a call to the pdf
  // }, [])
  // ------------------------------------------------------------------------------------------

    // Transform search into a list of pdf links
  // const searchJsx = pagesIndex.map(data =>
  //   <div key={data.sequence}>
  //     <h4>Date: {data.issue.date_issued}</h4>
  //     <p><embed src={data.pdf} type="application/pdf" height="800px" width="800px" /></p>
  //   </div>
  // )