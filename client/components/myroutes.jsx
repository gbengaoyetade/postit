import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './containers/signup.jsx';
import Login from './containers/login.jsx';
import Dashboard from './containers/dashboard';
import NotFound from './presentational/notfound.jsx';
import Group from './containers/group';
import Welcome from './presentational/welcome';
import Recover from './containers/recoverPassword';

const MyRoutes = () => (
 <BrowserRouter>
  <Switch>
  
    <Route exact path="/" component={Welcome} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/login/recover" component={Recover} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/group/:groupId" component={Group} />
    <Route path="*" component={NotFound} />

  </Switch>
  </BrowserRouter>
);

export default MyRoutes;
