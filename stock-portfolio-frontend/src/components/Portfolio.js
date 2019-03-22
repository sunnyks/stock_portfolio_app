import React from 'react';
import { connect } from 'react-redux'
import Store from '../store'

// this file is quite honestly hideous and is in need of major refactoring

class Portfolio extends React.Component {


  state = {
    // portfolio: this.props.portfolio,
    portfolioDetails: null,
    value: null,
    spent: null,
    showTransactions: null,
    transactions: null
  }

  getValue = () => {
    // figure this out wtf!
    // blow this up and start again
    // let value = 0
    let spent = 0
    if (Object.entries(this.props.activePortfolio.holdings).length === 0 && this.props.activePortfolio.holdings.constructor === Object) return
    let holdings = this.props.activePortfolio.holdings
    for (let h in holdings) {
      if (holdings[h].quantity >= 0) spent += holdings[h].spent
    }
    console.log("spent: ", spent)
    if (this.state.spent === spent) return
    this.setState({spent: spent})

    // let stocks = this.state.portfolioDetails
    let symbols = Object.keys(this.props.activePortfolio.holdings).join(',')
    fetch(this.props.API + `/stock/market/batch?symbols=${symbols}&types=quote`).then(res => res.json()).then((data) => {
      let value = 0
      for (let s in data) {
        value += this.props.activePortfolio.holdings[s].quantity * data[s].quote.latestPrice
      }
      console.log(data)
      console.log("value: ", value)
      this.setState({portfolioDetails: data, value: value})
      Store.dispatch({ type: 'fillPortfolioDetails',
                       portfolioDetails: data})
    })
    // debugger
    // ////////////////////////////////////////////////////////////////////////
    // // const holdings = this.props.portfolios[this.props.portfolio].holdings
    // let holdings = this.props.activePortfolio.holdings
    // //debugger
    // for (let stoc in holdings) {
    //   spent += holdings[stoc].spent
    // }
    // const stocks = this.props.portfolioDetails
    // for (let stok in stocks) {
    //   debugger
    //   value += holdings[stok].quantity * stocks[stok].quote.latestPrice
    // }
    // // debugger
    // if (this.state.value === (value-spent)) return
    // this.setState({value: (value - spent)})
    // // console.log(value-spent)
    // /////////////////////////////////////////////////////////////////////////
  }

  getPortfolioDetails = () => {
    let symbols = Object.keys(this.props.activePortfolio.holdings).join(',')
    fetch(this.props.API + `/stock/market/batch?symbols=${symbols}&types=quote`).then(res => res.json()).then((data) => {
      Store.dispatch({ type: 'fillPortfolioDetails',
                       portfolioDetails: data})
      // this.setState({portfolioDetails: data})
      console.log(data)
    })
    // .then(this.getValue())
  }

  componentDidUpdate() {
    // let symbols = Object.keys(this.props.activePortfolio.holdings).join(',')
    // debugger
    // if (this.state.portfolioDetails === null) return
    // if (Object.keys(this.props.portfolioDetails).join(',') === symbols) return
    // fetch(this.props.API + `/stock/market/batch?symbols=${symbols}&types=quote`).then(res => res.json()).then((data) => {
    //   Store.dispatch({ type: 'fillPortfolioDetails',
    //                    portfolioDetails: data})
    //   console.log(data)
    // }).then(this.getValue())

    // debugger
    // if (Object.keys(this.state.portfolioDetails) === Object.keys(this.props.activePortfolio)) return
    this.getValue()
  }

  componentDidMount() {
    // debugger
    // >>>>calculate value of portfolio<<<
    // `/stock/${symbol}/batch?types=quote,news,company,stats,logo,timeseries&range=1y`
    // /stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5
    // let symbols = Object.keys(this.props.portfolios[this.props.portfolio].holdings).join(',')
    // debugger
    // let symbols = Object.keys(this.props.activePortfolio.holdings).join(',')
    // fetch(this.props.API + `/stock/market/batch?symbols=${symbols}&types=quote`).then(res => res.json()).then((data) => {
    //   Store.dispatch({ type: 'fillPortfolioDetails',
    //                    portfolioDetails: data})
    //   console.log(data)
    // }).then(this.getValue())
    this.getPortfolioDetails()
    this.getValue()
    // debugger
  }

  //vvvvvvvv
  showPortfolio = () => {
    return JSON.stringify(this.props.activePortfolio)
    // Object.entries(this.props.activePortfolio).map(s => {})
  }

  showTransactionHistory = () => {
    if (this.props.transHistory) return
    fetch(this.props.BACKEND + '/transactions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => res.json()).then((trans) => {
      Store.dispatch({ type: 'fillTransHistory', action: trans})
      console.log(trans)
    })
  }

  render() {
    // debugger
    return(
      <div>
        <div>
          {this.props.activePortfolio ? this.showPortfolio() : null}
        </div>
        <div>
          Portfolio Value: {this.state.value - this.state.spent}
        </div>
        <button onClick={this.showTransactionHistory()}>Show Transaction History</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user: state.user,
          portfolios: state.portfolios,
          portfolioDetails: state.portfolioDetails,
          activePortfolio: state.activePortfolio,
          API: state.API,
          BACKEND: state.BACKEND}
}

const mapDispatchToProps = dispatch => {
  return
}



export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
