import { createStore } from 'redux';

const initialState = {
  stockNames: [],
  stockObjs: [],
  user: null,
  API: 'https://api.iextrading.com/1.0',
  market: {mostactive: null,
           gainers: null,
           losers: null},
  detail: null,
  portfolios: null,
  activePortfolio: null,
  BACKEND: 'http://localhost:3000',
  portfolioDetails: null
}

const rootReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case 'fillStocks': {
      return {...oldState, stockNames: action.stockNames, stockObjs: action.stockObjs}
    }
    case 'fillMarket': {
      return {...oldState, market: action.market}
    }
    case 'fillDetail': {
      return {...oldState, detail: action.detail}
    }
    case 'fillPortfolios': {
      return {...oldState, portfolios: action.portfolios}
    }
    case 'fillPortfolioDetails': {
      return {...oldState, portfolioDetails: action.portfolioDetails}
    }
    case 'setActivePortfolio': {
      return {...oldState, activePortfolio: action.activePortfolio}
    }
    case 'LOGIN': {
      return {...oldState, user: action.user}
    }
    case 'LOGOUT': {
      // localStorage.clear
      return {...oldState, user: null}
    }
    default: {
      return oldState
    }
  }
}



export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
