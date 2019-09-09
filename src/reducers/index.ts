import { combineReducers } from 'redux';
import counter from './counter';
import store from './store';
import user from './user';

export default combineReducers({
  counter,
  store,
  user,
});
