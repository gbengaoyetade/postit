import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Signup from './authentication/Signup.jsx';
import Login from './authentication/Login.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import NotFound from './errors/Notfound.jsx';
import Group from './group/Group.jsx';
import Welcome from './Home.jsx';
import Recover from './password/RecoverPassword.jsx';
import ChangePassword from './password/ChangePassword.jsx';
import MailSent from './password/MailSent.jsx';
import AuthHoc from './authentication/AuthHoc.jsx';
import NewGroup from './group/CreateGroup.jsx';
import Addmembers from './group/AddMembers.jsx';
import ErrorPage from './errors/Error.jsx';

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
