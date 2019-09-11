import { combineReducers } from 'redux';
import counter from './counter';
import store from './store';
import user from './user';
import trade from './trade';
import manage from './manage';

export default combineReducers({
  counter,
  store,
  user,
  trade,
  manage,
});
