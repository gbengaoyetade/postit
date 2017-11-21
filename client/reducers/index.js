import { combineReducers } from 'redux';
import userAuth from './userAuth';
import loginLogout from './loginLogout';
import { itemLoading, loginLoading } from './itemLoading';
import authError from './authError';
import groupReducer from './groupReducer';
import messageReducer from './messageReducer';
import recoverPassword from './passwordReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  userAuth,
  searchReducer,
  loginLogout,
  itemLoading,
  loginLoading,
  authError,
  messageReducer,
  groupReducer,
  recoverPassword,
});
