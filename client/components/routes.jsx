import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './containers/signup';
import Login from './containers/login';
import Dashboard from './containers/dashboard';
import NotFound from './presentational/notfound';
import Group from './containers/group';
import Welcome from './presentational/welcome';
import Recover from './containers/recoverPassword';
import ChangePassword from './containers/changePassword';
import MailSent from './presentational/mailSent';
import AuthHoc from './containers/authHoc';
import NewGroup from './containers/createGroup';
import Addmembers from './containers/addMembers';
import ErrorPage from './presentational/error';


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
