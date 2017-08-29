import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import MyRoute from './components/myroutes.jsx';
import store from './store';
// import './scss/postit.scss';


render(
  <Provider store={store}>
    <BrowserRouter >
      <MyRoute history={createBrowserHistory}/>
    </BrowserRouter>
  </Provider>, document.getElementById('app'));
