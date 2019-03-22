import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Store from '../store'

class Navbar extends React.Component {

  loggedIn = () => {
    // get logout working
    return <span> <Link to={'/profile'}> Profile </Link> <button OnClick={this.logOut}>Logout</button> </span>
  }

  logOut = () => {
    localStorage.clear()
    console.log('LOGOUT')
    Store.dispatch({ type: 'LOGOUT'})
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <div>Search:
          <Link to={'/'} className={'lol'}>Market</Link>
          {this.props.user ? this.loggedIn() : <Link to={'/login'}> Login </Link>}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {user: state.user}
}

//
// const mapDispatchToProps = dispatch => {
//   return
// }


export default withRouter(connect(mapStateToProps, null)(Navbar))
