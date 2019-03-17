import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import Store from '../store'

class Market extends React.Component {

    state = {
      mostactive: null,
      gainers: null,
      losers: null
    }

  componentDidMount() {
    // /stock/market/list/mostactive | gainers | losers
    fetch(this.props.API + '/stock/market/list/mostactive').then(res => res.json()).then(mostactive => {
      fetch(this.props.API + '/stock/market/list/gainers').then(res => res.json()).then(gainers => {
        fetch(this.props.API + '/stock/market/list/losers').then(res => res.json()).then(losers => {
          Store.dispatch({ type: 'fillMarket',
                           market: {
                             mostactive: mostactive,
                             gainers: gainers,
                             losers: losers
                           }})
    })})})

    Store.dispatch({ type: 'fillMarket',
                     market: {
                       mostactive: this.state.mostactive,
                       gainers: this.state.gainers,
                       losers: this.state.losers
                     }})

    // /stock/market/list/iexvolume
    // /stock/market/list/iexpercent
    // /stock/market/list/infocus
  }



  render() {
    const showList = (list) => {
      return list.map((entry, i) => {
        return <div>{i+1}. <Link to={`/stock/${entry.symbol}`}> {entry.symbol} {entry.companyName}</Link> ({entry.change})</div>
      })
    }

    return(
      <div>
        <div>
          <div>Most Active: {this.props.market.mostactive ? showList(this.props.market.mostactive) : 'loading...'}</div>
          <div>Biggest Gainers: {this.props.market.gainers ? showList(this.props.market.gainers) : 'loading...'}</div>
          <div>Biggest Losers: {this.props.market.losers ? showList(this.props.market.losers) : 'loading...'}</div>
        </div>
        <div>
          {this.props.stockObjs.map(stock => {return <div><Link to={`/stock/${stock.symbol}`}>{stock.symbol + ' - ' + stock.name}</Link></div>})}
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { stockNames: state.stockNames,
           stockObjs: state.stockObjs,
           API: state.API,
           market: state.market}
}


const mapDispatchToProps = dispatch => {
  return
}


export default withRouter(connect(mapStateToProps, null)(Market))
