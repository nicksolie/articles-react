import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'

// Template imports
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Shared/Header'

// Auth imports
import SignUp from '../Routes/Auth/SignUp'
import SignIn from '../Routes/Auth/SignIn'
import SignOut from '../Routes/Auth/SignOut'
import ChangePassword from '../Routes/Auth/ChangePassword'

// Collection imports
import CreateCollection from '../Routes/CreateCollection'
import ShowCollection from '../Routes/ShowCollection'
import IndexCollections from '../Routes/IndexCollections'
import Welcome from '../Routes/Welcome/Welcome'

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
          {/* Unauthenticated auth routes */}
          <Route exact path='/' render={() => (
            <Welcome />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />

          {/* Authenticated auth routes */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Unauthenticated collection routes */}
          <Route exact path='/collections' render={() => (
            <IndexCollections msgAlert={this.msgAlert} />
          )} />

          {/* Authenticated collection routes */}
          <AuthenticatedRoute user={user} exact path='/collections-create' render={() => (
            <CreateCollection user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collections/:id' render={({ match }) => (
            <ShowCollection user={user} match={match} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
