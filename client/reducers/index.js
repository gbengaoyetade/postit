import { combineReducers } from 'redux';
import createAccount from './createAccount';
import loginLogout from './loginLogout';
import itemLoading from './itemLoading';
import loginError from './error';
 
export default combineReducers({
  createAccount,
  loginLogout,
  itemLoading,
  loginError,
});
