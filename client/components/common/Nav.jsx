import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {object} props
 * @returns {object} -returns react element
 */
const Nav = (props) => {
  const logout = () => {
    localStorage.removeItem('postitUser');
    localStorage.removeItem('postitToken');
    props.history.push('/login');
  };
  // Check where postit logo links to.
  // It should link to dashboard if user is signed in, otherwise, landing page.
  let postitLink;
  if (localStorage.getItem('postitToken')) {
    postitLink = '/dashboard';
  } else {
    postitLink = '/';
  }
  return (
  <div className="row">
      <nav className="transparent col-s12">
        <ul id='userDropdown' className='dropdown-content'>
          <li>
            <a href="#" onClick={logout}>Logout</a>
          </li>
        </ul>
        <div className="nav-wrapper">
        <div>
          <div className="col s2 offset-s1">
          <Link to={postitLink} className="left brand-logo">
            Postit
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
Nav.propTypes = {
  middleLink: PropTypes.string,
  rightLink: PropTypes.object,
  history: PropTypes.object,
};
export default Nav;
