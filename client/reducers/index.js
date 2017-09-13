import { combineReducers } from 'redux';
import createAccount from './createAccount';
import loginLogout from './loginLogout';
import { itemLoading, loginLoading } from './itemLoading';
import { loginError, signupError, passwordError } from './authError';
import { createGroupReducer, getUserGroupSuccess, getUserGroupMessages, getGroupMembers, getGroupMembersSuccess } from './groupReducer';
import userGroupReducer from './userGroupsReducer';
import { postMessageReducer, messageSendingReducer } from './messageReducer';
import recoverPassword from './passwordReducer';

export default combineReducers({
  createAccount,
  loginLogout,
  itemLoading,
  loginLoading,
  signupError,
  passwordError,
  createGroupReducer,
  getUserGroupSuccess,
  getUserGroupMessages,
  postMessageReducer,
  messageSendingReducer,
  getGroupMembersSuccess,
  getGroupMembers,
  userGroupReducer,
  loginError,
  recoverPassword,
});
