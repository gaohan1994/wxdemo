import { RECEIVE_TRADE_HISTORY } from '../constants/constants';

const INITIAL_STATE = {
  tradeHistory: []
}

export default function trade(state = INITIAL_STATE, action) {
  switch(action.type) {
    case RECEIVE_TRADE_HISTORY: {
      const { payload } = action;

      if (payload.page === 1) {
        return {
          ...state,
          tradeHistory: payload.list
        }
      } else {
        return {
          ...state,
          tradeHistory: state.tradeHistory.concat(payload.list)
        }
      }
      
    }
    default:
      return state
  }
}
