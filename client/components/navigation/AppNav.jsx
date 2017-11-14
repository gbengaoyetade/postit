import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserGroups from '../group/UserGroups';

const AppNav = (props) => {
  let appHeader;
  if (props.useHeader) {
    appHeader = (
      <div className="dashboard-header row">
      <a href="#" className="right dropdown-button"
      data-activates="group-more">
      <i className="material-icons">more_vert</i>
      <i className="material-icons">person</i>
      <span className="group-members"> {props.numberOfGroupMembers}</span></a>
      <span className="bold">{props.groupName}</span>
    </div>
    );
  }
  return (
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
          <Link to="/group/create">
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
      <div className="col s10 offset-s1 m6 component-container">
        {appHeader}
      </div>
    </div>
  );
};

AppNav.propTypes = {
  numberOfGroupMembers: PropTypes.number,
  groupName: PropTypes.string,
  useHeader: PropTypes.string,
};

export default AppNav;
