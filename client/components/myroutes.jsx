import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signup from './containers/signup.jsx';
import Login from './containers/login.jsx';
import Dashboard from './containers/dashboard';
import NotFound from './presentational/notfound.jsx';
import Group from './containers/group';
import Welcome from './presentational/welcome';

const MyRoutes = () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/dashboard" component={Dashboard} />
    <Route exact path="/group" component={Group} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default MyRoutes;
