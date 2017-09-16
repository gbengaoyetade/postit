import { combineReducers } from 'redux';
import userAuth from './userAuth';
import loginLogout from './loginLogout';
import { itemLoading, loginLoading } from './itemLoading';
import { loginError, signupError, passwordError } from './authError';
import { createGroupReducer, getUserGroupMessages, getGroupMembers } from './groupReducer';
import userGroupReducer from './userGroupsReducer';
import { postMessageReducer, messageSendingReducer } from './messageReducer';
import recoverPassword from './passwordReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  userAuth,
  searchReducer,
  loginLogout,
  itemLoading,
  loginLoading,
  signupError,
  passwordError,
  createGroupReducer,
  getUserGroupMessages,
  postMessageReducer,
  messageSendingReducer,
  getGroupMembers,
  userGroupReducer,
  loginError,
  recoverPassword,
});
