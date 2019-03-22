import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';

//
//
// YIKES! refactor this
const BACKEND = "http://localhost:3000"

class Signup extends React.Component {

  state = {
    username: "",
    password: ""
  }

  getAuthToken = (info) => {
    return fetch(`${BACKEND}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }).then(res => res.json())
  }

//   fetch('http://localhost:3000/users', {
// method: 'POST',
// headers: {
// 'Content-Type': 'application/json',
// Accept: "application/json"},
// body: JSON.stringify({
// user: {
// username: 'wunny',
// password: '1234'}})}).then(res => res.json).then(console.log)

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(BACKEND + '/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json()).then(console.log)
    this.props.history.push('/login')
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Sign Up</h2>
          <label>Username</label>
          <input type="text" placeholder="username" onChange={(e) => this.setState({username: e.target.value})}/>
          <label>Password</label>
          <input type="password" placeholder="password" onChange={(e) => this.setState({password: e.target.value})}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default Signup
