import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'

// Template imports
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'

// Auth
import SignUp from '../Routes/Auth/SignUp'
import SignIn from '../Routes/Auth/SignIn'
import SignOut from '../Routes/Auth/SignOut'
import ChangePassword from '../Routes/Auth/ChangePassword'
import CreateCollection from '../Routes/CreateCollection'

import Header from '../Shared/Header'
// import Welcome from '../Routes/Welcome/Welcome'

// <Route path='/' render={() => (
//   <Welcome />
// )} />

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          {/* Unauthenticated routes */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          {/* Authenticated routes */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/collections' render={() => (
            <CreateCollection user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
