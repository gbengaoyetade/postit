import React from 'react';
import { Link } from 'react-router-dom';
import UserGroups from '../group/UserGroups';

/**
 * @description AppNav component. It contains navigation links
 * to app functionalities
 *
 * @param { object } props -prop object
 *
 * @returns { object } react element
 */
const AppNav = () => (
  (
    <div>
    <div
      className="col m3 component-container hide-on-med-and-down user-side-nav">
      <ul className="text-center collapsible" data-collapsible="accordion">
      <li className="big">
        <div className="collapsible-header">
        <i className="material-icons">home</i>
        <Link to="/dashboard">
           &nbsp;&nbsp;Dashboard
        </Link>
        </div>
        </li>

        <li className="big collapsible-header">
        <i className="material-icons">group_add</i>
          <Link to="/group/create" id="group-create">
           &nbsp;&nbsp;Create group
          </Link>
        </li>

        <li className="big">
          <div className="collapsible-header">
          <i className="material-icons">group</i>
          <Link to="#">&nbsp;&nbsp;My Groups</Link>
          </div>
        <div className="collapsible-body">
          <UserGroups />
        </div>
        </li>
      </ul>
    </div>
    </div>
  )
);

export default AppNav;
