import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import Routes from './components/routes.jsx';
import store from './store';
import './assets/scss/postit.scss';

const history = createHistory();


render(
  <Provider store={store} history={history}>
    <BrowserRouter >
      <Routes />
    </BrowserRouter>
  </Provider>, document.getElementById('app'));
