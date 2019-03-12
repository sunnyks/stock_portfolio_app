import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Ticker from './Ticker'
import Profile from './Profile'
import Detail from './Detail'
import Market from './Market'
import Navbar from './Navbar'
import Store from '../store'

class StockPortfolioApp extends React.Component {

  constructor(props) {
    super(props)
    //this.stocks = null
    //probably will just put it in store i guess
  }

  render() {
    return(
      <div>
      {/* use header component that holds navbar, ticker, and searchbar*/}
      <Navbar />
      <Ticker/>
      <div>top level container</div>
      {this.props.stocks /* lol */}
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/stock/:symbol" component={Detail} />
        <Route path="/" component={Market} />
      </Switch>
      </div>
    )
  }

  componentDidMount() {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols").then(res => res.json()).then(data => {
      // this.props.dispatch
      let stocks = data.map((stock) => {
        return stock.symbol + ' - ' + stock.name
      }) //get list of stock symbols and names
      Store.dispatch({ type: 'fillStocks',
                       stocks: stocks })
    })
  }

}


const mapStateToProps = state => {
  return { stocks: state.stocks }
        // ??
}


const mapDispatchToProps = dispatch => {
  return
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPortfolioApp) // pass in dispatch stuff? here or elsewhere IDK
