import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @description UserNav component. It is the navigation
 * used when user is logged in
 *
 * @param {object} props -prop object
 *
 * @returns {object} -returns react element
 */
const UserNav = (props) => {
  const logout = () => {
    localStorage.removeItem('postitUser');
    localStorage.removeItem('postitToken');
    props.history.push('/login');
  };
  return (
  <div className="row">
      <nav className="transparent col-s12">
        <ul id='userDropdown' className='dropdown-content'>
          <li>
            <a href="#" id="logout" onClick={logout}>Logout</a>
          </li>
        </ul>
        <div className="nav-wrapper">
        <div>
          {/* Mobile links */}
          <ul id="slide-out" className="side-nav grey">
          <p />
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/group/create">Create Group</Link></li>
        </ul>
      <Link
        to="#"
        data-activates="slide-out"
        className="button-collapse"
      >
        <i className="material-icons">menu</i>
      </Link>
          <div className="col s2 ">
            <span className="left brand-logo hide-on-med-and-down">
              Postit
            </span>
          </div>
          <div className="right">
            {props.rightLink}
          </div>
        </div>
        </div>
      </nav>
    </div>
  );
};
UserNav.propTypes = {
  middleLink: PropTypes.string,
  rightLink: PropTypes.object,
  history: PropTypes.object,
};
export default UserNav;
