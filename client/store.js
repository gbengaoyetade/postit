import { createStore } from 'redux';
import createAccount from './reducers/createAccount.js';

const defaultState = {
  user: '',
};
const store = createStore(createAccount, defaultState);
export default store;
