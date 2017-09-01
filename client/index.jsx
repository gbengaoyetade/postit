import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MyRoute from './components/myroutes.jsx';
import store from './store';
// import './postit.scss';


render(
  <Provider store={store}>
    <BrowserRouter >
      <MyRoute />
    </BrowserRouter>
  </Provider>, document.getElementById('app'));
