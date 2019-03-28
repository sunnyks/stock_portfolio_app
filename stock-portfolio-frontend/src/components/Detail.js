import React from 'react';
import Store from '../store'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import CandleStickChart from './CandleStickChart'
import TransactionForm from './TransactionForm'
import { Grid, Image, Table } from 'semantic-ui-react'
import CandleStickChartwMouse from './CandleStickChartwMouse'



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

  roundToTwo = (num) => {
      return +(Math.round(num + "e+2")  + "e-2");
    }

  displayColor = (change) => {
    let v = parseFloat(change)
    return (v < 0) ? 'down' : 'up'
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

    const showStats = () => {
      return(
        <div>
        <Table>
        <Table.Row>
          <Table.Cell>50 day moving average: </Table.Cell><Table.Cell>{this.roundToTwo(stats.day50MovingAvg).toFixed(2)}</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>200 day moving average: </Table.Cell><Table.Cell>{this.roundToTwo(stats.day200MovingAvg).toFixed(2)}</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>1 month change percent: </Table.Cell><Table.Cell>{this.roundToTwo(stats.month1ChangePercent).toFixed(2)}</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>3 month change percent: </Table.Cell><Table.Cell>{this.roundToTwo(stats.month3ChangePercent).toFixed(2)}</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>6 month change percent: </Table.Cell><Table.Cell>{this.roundToTwo(stats.month6ChangePercent).toFixed(2)}</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>52 week high: </Table.Cell><Table.Cell>{this.roundToTwo(stats.week52high).toFixed(2)}</Table.Cell></Table.Row>
          <Table.Row><Table.Cell>52 week low: </Table.Cell><Table.Cell>{this.roundToTwo(stats.week52low).toFixed(2)}</Table.Cell></Table.Row>
          </Table>
        </div>
      )
    }

    let price = (quote.iexRealtimePrice !== 0 && quote.iexRealtimePrice !== null) ? quote.iexRealtimePrice : quote.delayedPrice

    return(
      <div>
      <Grid verticalAlign='middle'>
      <Grid.Row columns={2}>
      <Grid.Column>
        <div>
          <a href={company.website} target="_blank">
          <img src={logo.url}/>
          <h1>{company.companyName}</h1>
          </a>
          <h2>{company.symbol}</h2>
        </div>
        </Grid.Column>
        <Grid.Column>
        <div className={'stockPrice'}>
          <h1>${this.roundToTwo(price).toFixed(2)}</h1>
          <h2 className={this.displayColor(quote.change)}>{quote.change} ({quote.changePercent})</h2>
        </div>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
        <Grid.Column>
        <div>
          <select id="chartdata" onChange={(e)=>{chartRangeChange(e)}} value={this.state.chartRange}>
            <option value="5y">5y</option>
            <option value="1y">1y</option>
            <option value="6m">6m</option>
            <option value="1m">1m</option>
          </select>
          <CandleStickChart data={this.state.detail.timeseries} width={1000}/>
        </div>
        </Grid.Column>
        <Grid.Column>
        {/*JSON.stringify(stats)*/}
        {showStats()}
        </Grid.Column>
        </Grid.Row>
        <div> {this.props.user ? <TransactionForm symbol={company.symbol} price={price}/> : null }</div>
        <Grid.Row columns={2}>
        <Grid.Column>
        <div>
          <p>Exchange: {company.exchange}</p>
          <p>Industry: {company.industry}</p>
          <p>Sector: {company.sector}</p>
          <p>Description: {company.description}</p>
        </div>
        </Grid.Column>
        <Grid.Column>
        <div>
          <h3>News: </h3>
          {showNews(news)}
        </div>
        </Grid.Column>
        </Grid.Row>
        </Grid>
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
