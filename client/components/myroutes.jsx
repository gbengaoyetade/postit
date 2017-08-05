import React from 'react';
import { Route, Switch, browserHistory, Router } from 'react-router-dom';
import Home from './home.jsx';
import Signup from './signup.jsx';
import Dashboard from './dashboard.jsx';
import NotFound from './notfound.jsx';

const MyRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/signup" component={Signup} />
    <Route path="*" component = {NotFound} />
  </Switch>
);

export default MyRoutes;
