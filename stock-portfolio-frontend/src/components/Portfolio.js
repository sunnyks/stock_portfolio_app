import React from 'react';
import { connect } from 'react-redux'

class Portfolio extends React.Component {

  // put all portfolio info into state
  state = {

  }

  // refactor so that its restful and portfolio IDs are stored in store
  componentDidMount() {
    // fetch contents of portfolio and value or w.e
    fetch('http://localhost:3000/portfolios/')
  }

  render() {
    return(
      <div>{this.props.portfolio}</div>
    )
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = dispatch => {
  return
}



export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
