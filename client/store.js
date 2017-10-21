import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}
const store = createStore(rootReducer, {}, applyMiddleware(...middleware));
export default store;
