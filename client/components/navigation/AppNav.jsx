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
      <ul className="text-center">
        <i className="material-icons left">group</i>
        <li className="big">
          <a href="#">
          Your groups
          </a>
        </li>
        <UserGroups />
        <li className="big">
          <Link to="/group/create">
            <i className="material-icons left">group_add</i>Create group
          </Link>
        </li>
      </ul>
    </div>
      <div className="col s10 offset-s1 m6   s10 component-container">
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
