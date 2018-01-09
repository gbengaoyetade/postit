import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './authentication/Signup';
import Login from './authentication/Login';
import Dashboard from './dashboard/Dashboard';
import NotFound from './errors/NotFound';
import Group from './group/Group';
import Welcome from './Home';
import Recover from './password/RecoverPassword';
import ChangePassword from './password/ChangePassword';
import MailSent from './password/MailSent';
import AuthHOC from './authentication/AuthHOC';
import NewGroup from './group/CreateGroup';
import Addmembers from './group/AddMembers';
import ErrorPage from './errors/Error';

/**
 * @description Routes component
 *
 * @returns {jsx} -jsx representation of the component
 */
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/password/reset" component={Recover} />
      <Route path="/password/update" component={ChangePassword} />
      <Route path="/email/sent" component={MailSent} />
      <Route path="/dashboard" component={AuthHOC(Dashboard)} />
      <Route exact path="/group/:groupId/addmembers"
        component={AuthHOC(Addmembers)} />
      <Route exact path="/group/create" component={AuthHOC(NewGroup)} />
      <Route exact path="/group/:groupId" component={AuthHOC(Group)} />
      <Route exact path="/error" component={AuthHOC(ErrorPage)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
