import React from 'react'
import Card from 'react-bootstrap/card'
import CardDeck from 'react-bootstrap/CardDeck'

const Home = () => {
    const cardStyles = {
        width: '22rem',
        marginBottom: '28px'
    }
    
    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop: '13px', marginBottom: '25px'}}>Home</h1>
            <CardDeck>
                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>Search by Publication</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Card.Text>
                    <Card.Link href="#search-publication">Start Here</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>Search the Awardees</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </Card.Text>
                    <Card.Link href="#home">TBA</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>Search by State</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus
                    </Card.Text>
                    <Card.Link href="#home">TBA</Card.Link>
                </Card.Body>
                </Card>
            </CardDeck>

            <CardDeck>
            <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>View Collections</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                    </Card.Text>
                    <Card.Link href="#collections">Start Here</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>View Entries</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
                    </Card.Text>
                    <Card.Link href="#entries">Start Here</Card.Link>
                </Card.Body>
                </Card>

                <Card style={cardStyles}>
                <Card.Body>
                    <Card.Title>TBA</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    TBA
                    </Card.Text>
                    <Card.Link href="#home">TBA</Card.Link>
                </Card.Body>
                </Card>
            </CardDeck>

            <CardDeck>
                <Card>
                <Card.Header >Today&apos;s Headline</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                        erat a ante.{' '}
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                    </footer>
                    </blockquote>
                </Card.Body>
                </Card>
            </CardDeck>
        </div>
    )
}

export default Home