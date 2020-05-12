import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#collections-create">Create a Collection</Nav.Link>
    <Nav.Link href="#collections">Collections</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#collections">Collections</Nav.Link>
    <Nav.Link href="#sign-up">Register</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link to="/">Welcome</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Welcome to Articles
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
