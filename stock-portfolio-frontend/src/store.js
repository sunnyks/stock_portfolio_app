import { createStore } from 'redux';

const initialState = {
  stocks: [],
  user: null
}

//show: "market" | "detail" | "profile" | "portfolio" | "transactions"

const rootReducer = (oldState = initialState, action) => {
  switch (action.type) {
    case 'fillStocks': {
      return {...oldState, stocks: action.stocks}
    }
    default: {
      return oldState
    }
  }
}



export default createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
