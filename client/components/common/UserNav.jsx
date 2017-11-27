import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {object} props
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
      <nav className="transparent col-s12 navbar-fixed">
        <ul id='userDropdown' className='dropdown-content'>
          <li>
            <a href="#" onClick={logout}>Logout</a>
          </li>
        </ul>
        <div className="nav-wrapper">
        <div>
          {/* Mobile links */}
          <div className="hide-on-med-and-up">
            <ul id="user-slide-out" className="side-nav">
              <p />
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/group/create">Create Group</Link></li>
            </ul>
            <Link
              to="#"
              data-activates="user-slide-out"
              className="left button-collapse">
              <i className="material-icons">menu</i>
            </Link>
          </div>
          <div className="col s2 ">
            <span className="center brand-logo">{props.middleLink}</span>
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
