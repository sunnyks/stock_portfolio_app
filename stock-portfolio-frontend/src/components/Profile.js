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

  handleSubmit = (e) => {
    e.preventDefault()
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
      return <button value={p} onClick={(e) => {this.setState({showPortfolio: p})}}>{p}</button>
    })
  }

  componentDidMount() {
    // fetch all the portfolios values and user data including total overall value
  }

  render() {
    return(<div>
      profile info (display portfolios) route to diff portfolios
        <div>
          <button onClick={() => this.setState({showNewPortNameIn: true})}>New Portfolio</button>
          {this.state.showNewPortNameIn ? this.showNewPortForm() : null}
        </div>
        <div>
          {this.portfolioList()}
          {this.state.showPortfolio ? <Portfolio portfolio={this.state.showPortfolio}/> : null}
        </div>
      </div>
    )
  }

}


const mapStateToProps = state => {
  return {user: state.user,
          portfolios: state.portfolios,
          activePortfolio: state.activePortfolio,
          backend: state.BACKEND}
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
