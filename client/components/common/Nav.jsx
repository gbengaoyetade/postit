import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = (props) => {
  const logout = () => {
    localStorage.removeItem('postitUser');
    localStorage.removeItem('postitToken');
    location.replace('/login');
  };
  return (
  <div className="row">
      <nav className="transparent col-s12">
        {/* User dropdown */}
        <ul id='userDropdown' className='dropdown-content'>
          <li><a href="#" onClick={logout}>Logout</a></li>
          </ul>
        <div className="nav-wrapper">
        <div>
          <div className="col s2 offset-s1 hide-on-med-and-down">
          <Link to="/" className="left brand-logo">Postit</Link>
          </div>
          <div className="col s2 ">
            <span className="center brand-logo">{props.middleLink}</span>
          </div>
          <div className="col m2 push-m5" >
            {props.rightLink}
          </div>
        </div>
        </div>
      </nav>
    </div>
  );
};
Nav.propTypes = {
  middleLink: PropTypes.string,
  rightLink: PropTypes.object,
};
export default Nav;
