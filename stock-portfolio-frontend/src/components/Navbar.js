import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class Navbar extends React.Component {

  loggedIn = () => {
    return <span> <Link to={'/profile'}> Profile </Link> <Link to={'/logout'}>Logout</Link> </span>
  }


  render() {
    return(
      <div>
        <div>'navbar with login/logout profile and searchbar(add searchbar component)'</div>
        <div>
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
