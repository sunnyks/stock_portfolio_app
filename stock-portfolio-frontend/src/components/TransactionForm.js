import React from 'react';
import Store from '../store'
import { connect } from 'react-redux'


class TransactionForm extends React.Component {

  state = {
    type: "buy",
    quantity: 0,
    portfolio: null
  }

  //get stock info from like um props

  // add input handlers
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(event)
    // make transaction post
    fetch('http://localhost:3000/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...this.state, user: this.props.user, symbol: this.props.symbol, price: this.props.price})
    }).then(res => res.json()).then(console.log)
    event.target.reset()
  }

  portfoliosSelect = () => {
      return Object.keys(this.props.portfolios).map((p) => {
          return <option value={p}>{p}</option>
        })
      }

  render() {
    return(
      <div>
        whaddaya buyin?? whadaya sellin?? i've got some good things on sale, stranger
        <form onSubmit={this.handleSubmit}>
          <select id="buysell" onChange={(e) => this.setState({type: e.target.value})} value={this.state.type}>
            <option value="buy">buy</option>
            <option value="sell">sell</option>
          </select>
          {/*select portfolio to make transaction in*/}
          <input type="text" placeholder="quantity" onChange={(e) => this.setState({quantity: e.target.value})}/> of {this.props.symbol} at ${this.props.price} for ${parseInt(this.state.quantity) * this.props.price} total in portfolio:
          <select id="portfolios" onChange={(e) => this.setState({portfolio: e.target.value})} value={this.state.portfolio ? this.state.portfolio : this.props.portfolios[0]}>
            {this.props.portfolios ? this.portfoliosSelect() : null}
          </select>
          {/*select quantity and confirm?*/}
          {/*post transaction*/}
          <button type="submit">Submit Transaction</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { API: state.API,
           user: state.user,
           activePortfolio: state.activePortfolio,
           portfolios: state.portfolios}
}

export default connect(mapStateToProps, null)(TransactionForm)
