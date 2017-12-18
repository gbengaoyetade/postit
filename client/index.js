import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import { Provider } from 'react-redux';
import Routes from './components/Routes';
import store from './store';
import './assets/scss/postit.scss';

const history = createHistory();

if (localStorage.getItem('postitToken')) {
  axios.defaults.headers.common['x-access-token'] =
  localStorage.getItem('postitToken');
}
render(
  <Provider store={store}>
      <Routes />
  </Provider>, document.getElementById('app'));
