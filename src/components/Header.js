import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#home">Home</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
  </Fragment>
)

// const unauthenticatedOptions = (
//   <Fragment>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Articles
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* Make ternary w/ unauthenticatedOptions */}
        { user && authenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
