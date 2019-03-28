import React from 'react';
import { connect } from 'react-redux'
import Store from '../store'
import { Link, withRouter } from 'react-router-dom'
import { Table, Tab } from 'semantic-ui-react'


// this file is quite honestly hideous and is in need of major refactoring

class Portfolio extends React.Component {


  state = {
    portfolioDetails: null,
    value: null,
    spent: null,
    showTransactions: false,
    transactions: null
  }

  getValue = () => {
    let spent = 0
    if (Object.entries(this.props.activePortfolio.holdings).length === 0 && this.props.activePortfolio.holdings.constructor === Object) return
    let holdings = this.props.activePortfolio.holdings
    for (let h in holdings) {
      if ((holdings[h].quantity >= 0)) spent += holdings[h].spent
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
  }

  portMatch = () => {
    // return (Object.keys(this.props.activePortfolio.holdings) === Object.keys(this.props.portfolioDetails))
    const a = Object.keys(this.props.activePortfolio.holdings)
    const b = Object.keys(this.props.portfolioDetails)
    if (a.length !== b.length) return false
    for (let q = 0; q < a.length; q++) {
      if (a[q] !== b[q]) return false
    }
    return true
  }

  // MOVE THIS TO PROFILE ACTUALLY
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
    this.getValue()
  }

  componentDidMount() {
    // this.getPortfolioDetails()
    this.getValue()
  }

  roundToTwo = (num) => {
      return +(Math.round(num + "e+2")  + "e-2");
    }

  //vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  showPortfolio = () => {
    // return JSON.stringify(this.props.activePortfolio)
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> Symbol </Table.HeaderCell>
            <Table.HeaderCell> Quantity </Table.HeaderCell>
            <Table.HeaderCell> Current Value ($)</Table.HeaderCell>
            <Table.HeaderCell> +/- (%)</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.showPortfolioHoldings()}
        </Table.Body>
      </Table>
    )
  }

  showPortfolioHoldings = () => {
    // lol refactor here
    const okayThen = Object.keys(this.props.activePortfolio.holdings)
    return okayThen.map(z => {
      if (this.props.activePortfolio.holdings[z].quantity <= 0) return null
      // debugger
      return(
        <Table.Row>
          <Table.Cell><Link to={`/stock/${z}`}>{z}</Link></Table.Cell>
          <Table.Cell>{this.props.activePortfolio.holdings[z].quantity}</Table.Cell>
          <Table.Cell>{this.roundToTwo(this.props.portfolioDetails[z].quote.latestPrice).toFixed(2)}</Table.Cell>
          <Table.Cell><p className={this.changeColor(this.calcChange(z))}>{this.calcChange(z)}</p></Table.Cell>
        </Table.Row>
      )
    })
  }

  calcChange = (stock) => {
    const s = this.props.activePortfolio.holdings[stock].spent
    const m = this.props.portfolioDetails[stock].quote.latestPrice * this.props.activePortfolio.holdings[stock].quantity
    const lol = m-s
    const p = (lol/s)*100
    return this.roundToTwo(lol.toFixed(2)).toString() + ' (' + p.toFixed(2).toString() + ')'
  }

  changeColor = (change) => {
    let v = change[0]
    return (v === '-') ? 'down' : 'up'
  }

  // getTransactionHistory = () => {
  //   if (this.props.transactionHistory) return
  //   fetch(this.props.BACKEND + '/transactions', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then(res => res.json()).then((trans) => {
  //     Store.dispatch({ type: 'fillTransHistory', transactionHistory: trans})
  //     console.log(trans)
  //   }).then(console.log('lol'))
  // }

  showTransactionTable = () => {
    // return this.props.transactionHistory.filter(t => t.portfolio_id === this.props.activePortfolio.id).map(t => {
    //   if (t.quantity === 0) return null
    //   return <div> {t.transtype} {Math.abs(t.quantity)} <Link to={`/stock/${t.symbol}`}> {t.symbol} </Link> @ ${t.price.toFixed(2)} on {t.created_at.split('T')[0]+', ' + t.created_at.split('T')[1].split('.')[0]}</div>
    // })
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> Buy/Sell </Table.HeaderCell>
            <Table.HeaderCell> Quantity </Table.HeaderCell>
            <Table.HeaderCell> Symbol </Table.HeaderCell>
            <Table.HeaderCell> Price </Table.HeaderCell>
            <Table.HeaderCell> Date </Table.HeaderCell>
            <Table.HeaderCell> Time </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.showTransaction()}
        </Table.Body>
      </Table>
    )
  }

  showTransaction = () => {
    return this.props.transactionHistory.filter(t => t.portfolio_id === this.props.activePortfolio.id).map(t => {
      if (t.quantity === 0) return null
      // return <div> {t.transtype} {Math.abs(t.quantity)} <Link to={`/stock/${t.symbol}`}> {t.symbol} </Link> @ ${t.price.toFixed(2)} on {t.created_at.split('T')[0]+', ' + t.created_at.split('T')[1].split('.')[0]}</div>
      return(
        <Table.Row>
          <Table.Cell>{t.transtype}</Table.Cell>
          <Table.Cell>{t.quantity}</Table.Cell>
          <Table.Cell><Link to={`/stock/${t.symbol}`}>{t.symbol}</Link></Table.Cell>
          <Table.Cell>{this.roundToTwo(t.price).toFixed(2)}</Table.Cell>
          <Table.Cell>{t.created_at.split('T')[0]}</Table.Cell>
          <Table.Cell>{t.created_at.split('T')[1].split('.')[0]}</Table.Cell>
        </Table.Row>
      )
    })
  }

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^


  render() {

      return(
          <div>
            <div>
              <h2 className={this.changeColor((this.state.value - this.state.spent).toString())}>Portfolio Returns: {(this.state.value - this.state.spent).toFixed(2)}</h2>
            </div>
            <div>
              {(this.props.activePortfolio && this.props.portfolioDetails && this.portMatch()) ? this.showPortfolio() : null}
            </div>
            <button onClick={() => {Store.dispatch({type: 'showTransactions', showTransactions: !this.props.showTransactions})}}>Show Transaction History</button>
            <div>
              {this.props.showTransactions ? this.showTransactionTable() : null}
            </div>
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
          BACKEND: state.BACKEND,
          transactionHistory: state.transactionHistory,
          showTransactions: state.showTransactions}
}

const mapDispatchToProps = dispatch => {
  return
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Portfolio))
