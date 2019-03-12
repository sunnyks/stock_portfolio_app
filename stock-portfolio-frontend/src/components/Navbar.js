import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux'

class Navbar extends React.Component {


  render() {
    return('navbar')
  }
}


const mapStateToProps = state => {
  return   // ??
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
