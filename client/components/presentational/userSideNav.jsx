import React from 'react';
import { Link } from 'react-router-dom';
import UserGroups from '../containers/userGroups';
import DashboardHeader from './dashboardHeader';

export default props => (
  <div>
  <div className="col m3 component-container hide-on-med-and-down user-side-nav">
    <ul className="">
      <li>
        <Link to="/group/create" className="hide-on-med-and-up">
          <i className="material-icons">group_add</i> New Group
        </Link>
      </li>
      <li className=""><p> Groups <Link to="/group/create"><i className="big material-icons right">add_circle</i></Link></p> </li>
      <UserGroups />
    </ul>
  </div>
    <div className="col s10 offset-s1 m6   s10 component-container">
      <DashboardHeader currentUrl={props.currentUrl} groupName={props.groupName} groupId={props.groupId} numberOfGroupMembers={props.numberOfGroupMembers} />
    </div>
  </div>
);
