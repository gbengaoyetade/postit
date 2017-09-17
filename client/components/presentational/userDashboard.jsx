import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from './userSideNav.jsx';

export default props => (
  <div className="row">
    <SideNav />
    <div className="col m6 s12 component-container">
      <p className="center header">Group messages</p>
    </div>
    <div className="col m3 component-container hide-on-med-and-down">
      <p className="center header">My groups</p>
      {props.userGroups}
    </div>
  </div>
);
