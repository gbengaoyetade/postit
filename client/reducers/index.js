import { combineReducers } from 'redux';
import createAccount from './createAccount';
import loginLogout from './loginLogout';
import { signupLoading, loginLoading } from './itemLoading';
import { loginError, signupError } from './authError';
import { createGroupReducer, getUserGroupSuccess } from './groupReducer';
import userGroupReducer from './userGroupsReducer';

export default combineReducers({
  createAccount,
  loginLogout,
  signupLoading,
  loginLoading,
  signupError,
  createGroupReducer,
  getUserGroupSuccess,
  userGroupReducer,
  loginError,
});
