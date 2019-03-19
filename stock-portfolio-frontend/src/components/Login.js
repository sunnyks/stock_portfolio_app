import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import Store from '../store'


const BACKEND = "http://localhost:3000"

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  getAuthToken = (info) => {
    return fetch(`${BACKEND}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }).then(res => res.json())
  }


  handleSubmit = (event) => {
    event.preventDefault()
    this.getAuthToken(this.state).then(payload => {
      localStorage.setItem("token", payload.jwt)
      Store.dispatch({ type: 'LOGIN',
                       user: payload.user})
      // fetch portfolios preemptively as well tbh
      fetch(BACKEND + `/users/${payload.user}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${payload.jwt}`
        }
      }).then(res => res.json()).then((data) => {
        console.log(data)
        Store.dispatch({ type: 'fillPortfolios',
                         portfolios: data.portfolios})
        this.props.history.push('/')
      })
    })
    // figure out why im logged out on refresh maybe check token and stuff
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <label>Username</label>
          <input type="text" placeholder="username" onChange={(e) => this.setState({username: e.target.value})}/>
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => this.setState({password: e.target.value})}/>
          <button type="submit">Submit</button>
        </form>
        <Link to="/signup">Sign Up</Link>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { API: state.API,
           user: state.user,
           BACKEND: state.BACKEND}
}

export default Login
