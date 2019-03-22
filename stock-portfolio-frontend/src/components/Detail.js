import React from 'react';
import Store from '../store'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import CandleStickChart from './CandleStickChart'
import TransactionForm from './TransactionForm'



class Detail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chartRange: '1y',
      detail: null // refactor detail out of redux store??? its causing a bug
    }
  }

  componentDidMount() {
    //fetch info
    const symbol = this.props.match.params.symbol
    fetch(this.props.API + `/stock/${symbol}/batch?types=quote,news,company,stats,logo,timeseries&range=1y`).then(res => res.json()).then((data) => {
      // grab the stuff i need
      console.log(data)
      // Store.dispatch({ type: 'fillDetail',
      //                  detail: data })
      this.setState({detail: data})
    })

  }

  // lol
  displayDetails() {
    let {quote, news, company, stats, logo, chart} = this.state.detail

    const showNews = (news) => {
      return news.map(story => {
        return <div><a href={story.url}>{story.headline}</a>{/*<p>{story.summary}</p>*/}</div>
      })
    }

    const chartRangeChange = (e) => {
      this.setState({chartRange: e.target.value})
      fetch(this.props.API + `/stock/${this.props.match.params.symbol}/batch?types=quote,news,company,stats,logo,timeseries&range=${e.target.value}`).then(res => res.json()).then((data) => {
        // Store.dispatch({ type: 'fillDetail',
        //                  detail: data })
        this.setState({detail: data})
      })
    }

    let price = (quote.iexRealtimePrice !== 0 && quote.iexRealtimePrice !== null) ? quote.iexRealtimePrice : quote.delayedPrice

    return(
      <div>
        <div>
          <a href={company.website} target="_blank">
          <img src={logo.url}/>
          <h1>{company.companyName}</h1>
          </a>
          <h2>{company.symbol}</h2>
        </div>
        <div>
          <h1>${price}</h1>
          <h2>{quote.change} ({quote.changePercent})</h2>
        </div>
        <div>SHOW SOME STATS</div>
        <div>
          add mouse stuff to CHART
          <select id="chartdata" onChange={(e)=>{chartRangeChange(e)}} value={this.state.chartRange}>
            <option value="5y">5y</option>
            <option value="1y">1y</option>
            <option value="6m">6m</option>
            <option value="1m">1m</option>
          </select>
          <CandleStickChart data={this.state.detail.timeseries} width={1000}/>
        </div>
        <div> {this.props.user ? <TransactionForm symbol={company.symbol} price={price}/> : null }</div>
        <div>
          <p>Exchange: {company.exchange}</p>
          <p>Industry: {company.industry}</p>
          <p>Sector: {company.sector}</p>
          <p>Description: {company.description}</p>
        </div>
        <div>
          {showNews(news)}
        </div>
      </div>
    )

  }

  render() {
    return(
      <div>
        {this.state.detail ?
          this.displayDetails()
          : 'loading...'}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { API: state.API,
           detail: state.detail,
           user: state.user}
}


const mapDispatchToProps = dispatch => {
  return
}


export default withRouter(connect(mapStateToProps, null)(Detail))
