import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
import MyRoute from './components/myroutes.jsx';
import Dashboard from './components/dashboard.jsx';

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
  <BrowserRouter>
    <MyRoute />
  </BrowserRouter>, document.getElementById('app'));
