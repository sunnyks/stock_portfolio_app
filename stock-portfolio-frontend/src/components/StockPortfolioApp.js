import React from 'react';
import { connect } from 'react-redux'

class StockPortfolioApp extends React.Component {

  render() {
    return(<div>top level container</div>)
  }

}


const mapStateToProps = state => {
  return
}


const mapDispatchToProps = dispatch => {
  return
}

export default connect(mapStateToProps, mapDispatchToProps)(StockPortfolioApp) // pass in dispatch stuff? here or elsewhere IDK
