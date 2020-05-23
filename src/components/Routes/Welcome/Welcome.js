import React from 'react'

// <p><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_beatles_ver01/data/sn86069873/00100479461/1905101301/0269.pdf" type="application/pdf" height="400px" width="400px" /></p>

const Welcome = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <h3>Please login to use site (please avoid real emails for security reasons!</h3>
      <h5>Below is an example of a newpaper you can find by querying Chronicling America.</h5>
      <p><embed src="https://chroniclingamerica.loc.gov/data/batches/kyu_one_ver01/data/sn86069873/00100479266/1904041201/0240.pdf" type="application/pdf" height="500px" width="500px" /></p>
    </div>
  )
}

export default Welcome
