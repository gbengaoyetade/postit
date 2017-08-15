import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MyRoute from './components/myroutes.jsx';
import store from './store';
// import Dashboard from './components/dashboard';

class App extends React.Component {
  render () {
    return (
      <div>
      <p> Hello welcome to React! {this.props.value}</p>
      </div>
      );
  }
}

render(
  <Provider store={store}>
  <BrowserRouter>
      <MyRoute />
  </BrowserRouter>
  </Provider>, document.getElementById('app'));
