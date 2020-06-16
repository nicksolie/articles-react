import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import styles from './../index.scss'

// Template imports
import AuthenticatedRoute from './AuthenticatedRoute/AuthenticatedRoute'
import Header from './Header'

// Auth imports
import SignInSignUp from './Auth/SignInSignUp'
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

  render () {
    const { user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        <main style={styles} className="container">
          {/* Unauthenticated auth routes */}
          <Route exact path='/' render={() => (
            <Welcome />
          )} />
          <Route path='/entry' render={() => (
            <SignInSignUp setUser={this.setUser} />
          )} />

          {/* Authenticated auth routes */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword user={user} />
          )} />

          {/* Authenticated collection routes */}
          <AuthenticatedRoute user={user} exact path='/collections' render={() => (
            <IndexCollections  user={user} />
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
            <Home user={user} />
          )} />
          <AuthenticatedRoute path='/search-publication' user={user} render={({ match }) => (
            <SearchPublication user={user} match={match} />
          )} />
          <AuthenticatedRoute path='/search-publication-issues' user={user} render={({ location }) => (
            <SearchPublicationIssues user={user} location={location} />
          )} />
          {/* Authenticated Awardee routes */}
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
