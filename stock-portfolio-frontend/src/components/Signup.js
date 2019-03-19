import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';

//
//
// YIKES! refactor this

class Signup extends React.Component {

  state = {
    username: "",
    password: ""
  }

  getAuthToken = (info) => {
    const BACKEND = "http://localhost:3000"
    return fetch(`${BACKEND}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    }).then(res => res.json())
  }

  //
  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   this.getAuthToken(this.state).then(payload => {
  //     localStorage.setItem("token", payload.token)
  //     this.props.history.push('/')
  //   })
  // }

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
