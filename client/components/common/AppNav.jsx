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
      className="col m2 component-container hide-on-med-and-down user-side-nav">
      <ul className="text-center collapsible" data-collapsible="accordion">
      <li className="big">
        <div className="collapsible-header">
        <Link to="/dashboard">
        <i className="material-icons">home</i>
           &nbsp;&nbsp;Dashboard
        </Link>
        </div>
        </li>

        <li className="big collapsible-header">
          <Link to="/group/create" id="group-create">
          <i className="material-icons">group_add</i>
           &nbsp;&nbsp;Create group
          </Link>
        </li>

        <li className="big">
          <div className="collapsible-header">
          <Link to="#">
            <i className="material-icons">group</i>
            &nbsp;&nbsp;My Groups
          </Link>
          </div>
        <div className="collapsible-body scrollable-component">
          <UserGroups />
        </div>
        </li>
      </ul>
    </div>
    </div>
  )
);

export default AppNav;
