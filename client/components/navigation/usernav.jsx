import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginLoading } from '../../actions/userAuthActions';

const UserNav = (props) => {
  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('postitToken');
    props.history.push('/login');
    props.loginLoading(false);
  };
  return (
    <div>
      { /* Side nav */ }
      <ul id="slide-out" className="side-nav">
        <li>
        <Link to="#" className="hide-on-med-and-up modal-trigger">
          <i className="material-icons">group_add</i> New Group
        </Link>
        </li>
        <li>
        <Link to="group">
          <i className="material-icons">group</i> My Groups
        </Link>
        </li>
        <li><div className="divider" /></li>
        <li><Link className="waves-effect" to="#">
          <i className="material-icons">account_circle</i> Profile
        </Link></li>
        <li>
          <Link to="#" onClick={logout}>
          <i className="material-icons"></i>
          Logout
          </Link>
        </li>
      </ul>
      { /* end of sidenav  */ }
      <nav className="light-blue darken-4">
        <div className="nav-wrapper  ">
          <Link to="#" className="left brand-logo hide-on-med-and-down">
            Postit
          </Link>
          <a href="#" className="brand-logo hide-on-med-and-up">Postit</a>
          <div className="hide-on-med-and-up left white-text " >
            <Link to="#" data-activates="slide-out"
            className="button-collapse left">
              <i className="material-icons">menu</i>
            </Link>
          </div>
          {/* <ul className="hide-on-med-and-down">
            <li><a href="#">{props.username}
              </a></li>
          </ul> */}

          <ul id='userDropdown' className='dropdown-content'>
            <li><a href="#" onClick={logout}>Logout</a></li>
          </ul>
            <div className="right">
            <a className='dropdown-button' href='#'
            data-activates='userDropdown'>
              {props.username}
              <i className="material-icons red-text">arrow_drop_down</i>
            </a>
            </div>
        </div>
      </nav>
    </div>
  );
};
UserNav.propTypes = {
  loginLoading: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => (
  {
    loginLoading: (bool) => {
      dispatch(loginLoading(bool));
    },
  }
);
export default connect(null, mapDispatchToProps)(withRouter(UserNav));
