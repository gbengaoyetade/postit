import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './components/routes';
import store from './store';
import './assets/scss/postit.scss';


render(
  <Provider store={store}>
    <BrowserRouter >
      <Routes />
    </BrowserRouter>
  </Provider>, document.getElementById('app'));
