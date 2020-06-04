import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import styles from './../index.scss'

// Template imports
import AuthenticatedRoute from './AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './AutoDismissAlert/AutoDismissAlert'
import Header from './Shared/Header'

// Auth imports
import SignUp from './Auth/SignUp'
import SignIn from './Auth/SignIn'
import SignOut from './Auth/SignOut'
import ChangePassword from './Auth/ChangePassword'

// Collection imports
import CreateCollection from './Collections/CreateCollection'
import ShowCollection from './Collections/ShowCollection'
import IndexCollections from './Collections/IndexCollections'
import Welcome from './Welcome'
import EditCollection from './Collections/EditCollection'

// Entry imports
import CreateEntry from './Entries/CreateEntry'
import IndexEntries from './Entries/IndexEntries'
import ShowEntry from './Entries/ShowEntry'
import EditEntry from './Entries/EditEntry'

// Search imports
import Home from './Home'
import SearchPublicationIssues from './Search/Publications/SearchPublicationIssues'
import SearchPublication from './Search/Publications/SearchPublication'
import SearchPublicationAllResults from './Search/Publications/SearchPublicationAllResults'
import SearchPublicationSelectedResults from './Search/Publications/SearchPublicationSelectedResults'

import SearchAwardees from './Search/Awardees/SearchAwardees'

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
        <main style={styles} className="container">
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

          {/* Authenticated collection routes */}
          <AuthenticatedRoute user={user} exact path='/collections' render={() => (
            <IndexCollections msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collections-create' render={() => (
            <CreateCollection user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collections/:id' render={({ match }) => (
            <ShowCollection user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collections/:id/edit' render={({ match }) => (
            <EditCollection user={user} match={match} />
          )} />

          {/* Authenticated entry routes */}
          <AuthenticatedRoute user={user} exact path='/create-entry/:id' render={({ match }) => (
            <CreateEntry user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/entries' render={({ match }) => (
            <IndexEntries user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/entries/:id' render={({ match }) => (
            <ShowEntry user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/entries/:id/edit' render={({ match }) => (
            <EditEntry user={user} match={match} />
          )} />

          {/* Authenticated search routes */}
          <AuthenticatedRoute user={user} exact path='/home' render={() => (
            <Home msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute path='/search-publication' user={user} render={({ match }) => (
            <SearchPublication user={user} match={match} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute path='/search-publication-issues' user={user} render={({ match, location }) => (
            <SearchPublicationIssues user={user} match={match} location={location} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute path='/search-publication-all-results' user={user} render={({ match, location }) => (
            <SearchPublicationAllResults user={user} match={match} location={location} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute path='/search-publication-selected-results' user={user} render={({ match, location }) => (
            <SearchPublicationSelectedResults user={user} match={match} location={location} msgAlert={this.msgAlert} />
          )} />

          {/* Authenticated Awardee routes */}
          <AuthenticatedRoute user={user} exact path='/search-awardees' render={() => (
            <SearchAwardees msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)