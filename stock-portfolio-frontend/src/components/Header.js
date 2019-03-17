import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Ticker from './Ticker'

class Header extends React.Component {


  render() {
    return(
      <div>
        <Navbar/>
        <Ticker/>
      </div>
    )
  }
}

//figure these out
export default connect(null, null)(Header)
