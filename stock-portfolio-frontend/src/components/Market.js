import React from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import Store from '../store'
import { Divider, Grid, Image, Segment } from 'semantic-ui-react'
import CandleStickChart from './CandleStickChart'


class Market extends React.Component {

    state = {
      mostactive: null,
      gainers: null,
      losers: null,
      dow: null,
      snp: null
    }

  componentDidMount() {
    // /stock/market/list/mostactive | gainers | losers
    fetch(this.props.API + '/stock/market/list/mostactive').then(res => res.json()).then(mostactive => {
      fetch(this.props.API + '/stock/market/list/gainers').then(res => res.json()).then(gainers => {
        fetch(this.props.API + '/stock/market/list/losers').then(res => res.json()).then(losers => {
          fetch(this.props.API + '/stock/market/batch?symbols=DIA,SPY&types=quote,news,timeseries&range=1m').then(res => res.json()).then(mark => {
          // /stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5
          console.log(mark)
          Store.dispatch({ type: 'fillMarket',
                           market: {
                             mostactive: mostactive,
                             gainers: gainers,
                             losers: losers,
                             dow: mark["DIA"],
                             snp: mark["SPY"]
                           }})
    })})})
  })

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


  showNews = () => {
    return this.props.market.snp.news.map(s => {
      return <div><a href={s.url} target="_blank">{s.headline}</a></div>
    })
  }

  showIndex = (index) => {
    return(
      <CandleStickChart data={index.timeseries} width={800}/>
    )
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
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <div><h3>Most Active: </h3>{this.props.market.mostactive ? showList(this.props.market.mostactive) : 'loading...'}</div>
            </Grid.Column>
            <Grid.Column>
              <div><h3>Biggest Gainers: </h3>{this.props.market.gainers ? showList(this.props.market.gainers) : 'loading...'}</div>
            </Grid.Column>
            <Grid.Column>
              <div><h3>Biggest Losers: </h3>{this.props.market.losers ? showList(this.props.market.losers) : 'loading...'}</div>
            </Grid.Column>
          </Grid.Row>
          <Divider vertical></Divider>

          <Grid.Row columns={2}>
            <Grid.Column>
              <h1>Dow Jones</h1>
              {this.props.market.dow ? this.showIndex(this.props.market.dow) : 'loading...'}

            </Grid.Column>
            <Grid.Column>
              <h1>S&P 500</h1>
              {this.props.market.snp ? this.showIndex(this.props.market.snp) : 'loading...'}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        </div>
        <div>
          <h2>News</h2>
          {this.props.market.snp ? this.showNews() : 'loading...'}
          {/*{this.props.stockObjs.map(stock => {return <div><Link to={`/stock/${stock.symbol}`}>{stock.symbol + ' - ' + stock.name}</Link></div>})}*/}
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { stockNames: state.stockNames,
           stockObjs: state.stockObjs,
           API: state.API,
           market: state.market,
           user: state.user}
}


const mapDispatchToProps = dispatch => {
  return
}


export default withRouter(connect(mapStateToProps, null)(Market))
