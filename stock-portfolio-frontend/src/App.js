import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockPortfolioApp from './components/StockPortfolioApp.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <StockPortfolioApp />
      </div>
    );
  }
}

export default App;
