import { combineReducers } from 'redux';
import createAccount from './createAccount';
import loginLogout from './loginLogout';
import { signupLoading, loginLoading } from './itemLoading';
import { loginError, signupError } from './authError';

export default combineReducers({
  createAccount,
  loginLogout,
  signupLoading,
  loginLoading,
  signupError,
  loginError,
});
