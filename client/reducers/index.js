import { combineReducers } from 'redux';
import createAccount from './createAccount';
import loginLogout from './loginLogout';

export default combineReducers({
  createAccount,
  loginLogout,
});
