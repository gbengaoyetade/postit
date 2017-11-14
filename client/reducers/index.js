import { combineReducers } from 'redux';
import userAuth from './userAuth';
import loginLogout from './loginLogout';
import { itemLoading, loginLoading } from './itemLoading';
import { loginError, signupError, passwordError } from './authError';
import { getUserGroupMessages,
  getGroupMembers, addMemberSuccess
} from './groupReducer';
import userGroupReducer from './userGroupsReducer';
import sendMessageSuccess from './messageReducer';
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
  sendMessageSuccess,
  getUserGroupMessages,
  getGroupMembers,
  addMemberSuccess,
  userGroupReducer,
  loginError,
  recoverPassword,
});
