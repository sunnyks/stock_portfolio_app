import React from 'react';
import { connect } from 'react-redux'
import Portfolio from './Portfolio'
import Store from '../store'

class Profile extends React.Component {

  state = {
    showNewPortNameIn: false,
    newPortName: null,
    showPortfolio: false
  }

  showNewPortForm = () => {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Name of new portfolio" onChange={(e) => this.setState({newPortName: e.target.value})}/>
        <button type="submit">Create Portfolio</button>
      </form>
    )
  }

  // getTransactionHistory = () => {
  //   if (this.props.transactionHistory) return
  //   return fetch(this.props.BACKEND + '/transactions', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then(res => res.json()).then((trans) => {
  //     Store.dispatch({ type: 'fillTransHistory', transactionHistory: trans})
  //     console.log(trans)
  //   })
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(this.props.portfolios).indexOf(this.state.newPortName) >= 0) return
    // fetch post new portfolio
    console.log(this.state.newPortName)
    fetch('http://localhost:3000/portfolios', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        portfolioName: this.state.newPortName,
        user: this.props.user
      })
    }).then(res => res.json()).then((data) => {
      Store.dispatch({type: 'fillPortfolios',
                      portfolios: data.portfolios})
    })
    e.target.reset()
    this.setState({showNewPortNameIn: false})
  }

  portfolioList = () => {
    return Object.keys(this.props.portfolios).map(p => {
      return <button value={p} onClick={(e) => {
        this.getPortfolioDetails(p)
        Store.dispatch({type: 'setActivePortfolio', activePortfolio: this.props.portfolios[p]})
        // this.setState({showPortfolio: p})
      }}>{p}</button>
    })
  }

  getPortfolioDetails = (p) => {
    if (Object.keys(this.props.portfolios)[0].holdings === undefined) return null
    let symbols = Object.keys(this.props.portfolios[p].holdings).join(',')
    fetch(this.props.API + `/stock/market/batch?symbols=${symbols}&types=quote`).then(res => res.json()).then((data) => {
      Store.dispatch({ type: 'fillPortfolioDetails',
                       portfolioDetails: data})
      // this.setState({portfolioDetails: data})
      console.log(data)
    })
    // .then(this.getValue())
  }

  componentDidMount() {
    // fetch all the portfolios values and user data including total overall value
    // this.getTransactionHistory()
  }

  render() {
    if (this.props.user === null) {
      this.props.history.push('/login')
      return(null)
    }
    else {
      return(<div>
          <div>
            <button onClick={() => this.setState({showNewPortNameIn: true})}>New Portfolio</button>
            {this.state.showNewPortNameIn ? this.showNewPortForm() : null}
          </div>
          <div>
            {this.props.user ? this.portfolioList() : null}
            {this.props.activePortfolio ? <Portfolio/> : "Pick a portfolio to view"}
          </div>
        </div>
      )
    }
    }

}


const mapStateToProps = state => {
  return {user: state.user,
          portfolios: state.portfolios,
          activePortfolio: state.activePortfolio,
          backend: state.BACKEND,
          API: state.API}
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
