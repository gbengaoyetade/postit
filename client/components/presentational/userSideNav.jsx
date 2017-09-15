import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className="col m2 component-container hide-on-med-and-down">
    <ul className="">
      <li>
        <Link to="/group/create" className="hide-on-med-and-up">
          <i className="material-icons">group_add</i> New Group
        </Link>
      </li>
      <li><Link className="waves-effect" to="/dashboard">
        Dashboard
      </Link><i className="left material-icons">home</i>
      <div className="clearfix"> </div>
      </li>
      <li>
        <Link to="/group/create" className="waves-effect" > New Group</Link>
        <i className="left material-icons">group_add</i>
      </li>
    </ul>
  </div>
);
