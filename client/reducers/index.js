import { combineReducers } from 'redux';
import itemLoadingReducer from './itemLoadingReducer';
import authReducer from './authReducer';
import groupReducer from './groupReducer';
import messageReducer from './messageReducer';
import recoverPassword from './passwordReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  searchReducer,
  itemLoadingReducer,
  authReducer,
  messageReducer,
  groupReducer,
  recoverPassword,
});
