import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import Profile from './Profile'
import Detail from './Detail'
import Market from './Market'
import Store from '../store'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'

class StockPortfolioApp extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
      <Header/>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/profile" component={withRouter(Profile)} />
        <Route exact path="/stock/:symbol" component={withRouter(Detail)} />
        <Route exact path="/" component={withRouter(Market)} />
      </Switch>
      </div>
    )
  }

  componentDidMount() {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols").then(res => res.json()).then(data => {
      let stocks = data.map((stock) => {
        return stock.symbol + ' - ' + stock.name
      }) //get list of stock symbols and names
      Store.dispatch({ type: 'fillStocks',
                       stockNames: stocks ,
                       stockObjs: data })
    })
  }

}


const mapStateToProps = state => {
  return { stocks: state.stocks,
            API: state.API }
}


const mapDispatchToProps = dispatch => {
  return
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockPortfolioApp)) // pass in dispatch stuff? here or elsewhere IDK
