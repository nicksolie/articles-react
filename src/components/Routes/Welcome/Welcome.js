import React from 'react'

const Welcome = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <h3>Please login to use site (please avoid real emails for security reasons)!</h3>
      <h3>Use the Search Form tab located on the header to begin a query.</h3>
      <h4>You can view my readme <a href="https://github.com/nicksolie/articles-react/blob/master/README.md" Adding rel="noopener noreferrer" target="_blank">here</a></h4>
      <h5>Below is an example of a newpaper you can find by querying Chronicling America.</h5>
      <p><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="500px" width="500px" /></p>
    </div>
  )
}

export default Welcome
