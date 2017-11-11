import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let storeValue;
if (process.env.NODE_ENV) {
  storeValue = createStore(rootReducer, {}, applyMiddleware(thunk));
} else {
  storeValue = createStore(rootReducer, {}, applyMiddleware(thunk, logger));
}
// storeValue variable was created because eslint flags and error when
// a mutable value is being exported
const store = storeValue;
export default store;
