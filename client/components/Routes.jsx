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
import AuthHoc from './authentication/AuthHoc';
import NewGroup from './group/CreateGroup';
import Addmembers from './group/AddMembers';
import ErrorPage from './errors/Error';

/**
 * @description Routes component
 *
 * @returns { object } -returns react element
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
      <Route path="/dashboard" component={AuthHoc(Dashboard)} />
      <Route exact path="/group/:groupId/addmembers"
        component={AuthHoc(Addmembers)} />
      <Route exact path="/group/create" component={AuthHoc(NewGroup)} />
      <Route exact path="/group/:groupId" component={AuthHoc(Group)} />
      <Route exact path="/error" component={AuthHoc(ErrorPage)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
