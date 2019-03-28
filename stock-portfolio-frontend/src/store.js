import { createStore } from 'redux';

const initialState = {
  stockNames: [],
  stockObjs: [],
  searchBarOptions: null,
  user: null,
  API: 'https://api.iextrading.com/1.0',
  market: {mostactive: null,
           gainers: null,
           losers: null},
  detail: null,
  portfolios: null,
  activePortfolio: null,
  BACKEND: 'http://localhost:3000',
  portfolioDetails: null,
  transactionHistory: null,
  showTransactions: false
}

const rootReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case 'searchBarOptions': {
      return {...oldState, searchBarOptions: action.searchBarOptions}
    }
    case 'fillStocks': {
      return {...oldState, stockNames: action.stockNames, stockObjs: action.stockObjs, searchBarOptions: action.searchBarOptions}
    }
    case 'fillMarket': {
      return {...oldState, market: action.market}
    }
    case 'fillDetail': {
      return {...oldState, detail: action.detail}
    }
    case 'fillPortfolios': {
      return {...oldState, portfolios: action.portfolios, transactionHistory: action.transactionHistory}
    }
    case 'fillPortfolioDetails': {
      return {...oldState, portfolioDetails: action.portfolioDetails}
    }
    case 'fillTransHistory': {
      return {...oldState, transactionHistory: action.transactionHistory}
    }
    case 'setActivePortfolio': {
      return {...oldState, activePortfolio: action.activePortfolio, showTransactions: false}
    }
    case 'showTransactions': {
      return {...oldState, showTransactions: true}
    }
    case 'LOGIN': {
      return {...oldState, user: action.user}
    }
    case 'LOGOUT': {
      return {initialState}
    }
    default: {
      return oldState
    }
  }
}



export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
