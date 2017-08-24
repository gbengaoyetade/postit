import { combineReducers } from 'redux';
import createAccount from './createAccount';
import loginLogout from './loginLogout';
import { signupLoading, loginLoading } from './itemLoading';
import { loginError, signupError } from './authError';
import createGroupReducer from './groupReducer';

export default combineReducers({
  createAccount,
  loginLogout,
  signupLoading,
  loginLoading,
  signupError,
  createGroupReducer,
  loginError,

});
