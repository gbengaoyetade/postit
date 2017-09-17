import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginLoading } from '../../actions/auth';

const UserNav = (props) => {
  const logout = () => {
    window.sessionStorage.postitToken = '';
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
          <Link to="#" onClick={logout}><i className="material-icons"></i>Logout</Link>
        </li>
      </ul>
      { /* end of sidenav  */ }
      <nav>
        <div className="nav-wrapper  light-blue darken-4 ">
          <Link to="#" className="left brand-logo hide-on-med-and-down">Postit</Link>
          <a href="#" className="brand-logo hide-on-med-and-up">Postit</a>
          <div className="hide-on-med-and-up left white-text " >
            <Link to="#" data-activates="slide-out" className="button-collapse left">
              <i className="material-icons">menu</i>
            </Link>
          </div>
          
          <ul className="right hide-on-med-and-down">
            {/* <li><Link to="#" ><i className="material-icons">notifications</i></Link></li> */}
            <li><Link to="/user" >{props.username}</Link></li>
            <li><Link to="#" onClick={logout}>Logout</Link></li>
          </ul>
          <form className="right hide-on-med-and-down">
          <div className="input-field">
            <input id="search" type="search" required />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form>
        </div>
      </nav>
    </div>
    );
};
UserNav.propTypes = {
  loginLoading: React.PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => (
  {
    loginLoading: (bool) => {
      dispatch(loginLoading(bool));
    },
  }
);
export default connect(null, mapDispatchToProps)(withRouter(UserNav));
