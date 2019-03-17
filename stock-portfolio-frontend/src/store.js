import { createStore } from 'redux';

const initialState = {
  stockNames: [],
  stockObjs: [],
  user: null,
  API: 'https://api.iextrading.com/1.0',
  market: {mostactive: null,
           gainers: null,
           losers: null},
  detail: null
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
    default: {
      return oldState
    }
  }
}



export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
