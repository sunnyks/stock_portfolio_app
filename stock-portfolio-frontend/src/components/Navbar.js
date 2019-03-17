import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

class Navbar extends React.Component {


  render() {
    return(
      <div>
        <div>'navbar with login/logout profile and searchbar(add searchbar component)'</div>
        <div><Link to={'/'} className={'lol'}>Market</Link> <Link to={'/profile'}> Profile </Link></div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return   // ??
}


const mapDispatchToProps = dispatch => {
  return
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
