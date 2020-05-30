import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';


class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/home'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign In</h3>
          <h6>Note: login can sometimes take a moment.</h6>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <TextField
                id="standard-full-width"
                type="email"
                name="email"
                label="Email Address"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <TextField
                id="standard-password-input"
                name="password"
                label="Password"
                value={password}
                helperText="Do not use your real passowrd"
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="contained">
              Primary
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

{/* <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div> */}

export default withRouter(SignIn)
