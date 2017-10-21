import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './authentication/signup';
import Login from './authentication/login';
import Dashboard from './dashboard/dashboard';
import NotFound from './errors/notfound';
import Group from './group/group';
import Welcome from './index';
import Recover from './password/recoverPassword';
import ChangePassword from './password/changePassword';
import MailSent from './password/mailSent';
import AuthHoc from './authentication/authHoc';
import NewGroup from './group/createGroup';
import Addmembers from './group/addMembers';
import ErrorPage from './errors/error';


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/password_reset" component={Recover} />
      <Route path="/password_change" component={ChangePassword} />
      <Route path="/email_sent" component={MailSent} />
      <Route path="/dashboard" component={AuthHoc(Dashboard)} />
      <Route exact path="/group/:groupId/addmembers" component={AuthHoc(Addmembers)} />
      <Route exact path="/group/create" component={AuthHoc(NewGroup)} />
      <Route exact path="/group/:groupId" component={AuthHoc(Group)} />
      <Route exact path="/error" component={AuthHoc(ErrorPage)} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
