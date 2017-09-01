import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import GroupForm from '../containers/createGroup';

const UserNav = (props) => {
  const logout = () => {
    window.sessionStorage.postitToken = '';
    props.history.push('/login');
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper  light-blue darken-4 ">
          <a href="#!" className="left brand-logo hide-on-med-and-down">Postit</a>
          <a href="#" className="brand-logo hide-on-med-and-up">Postit</a>
          <div className="hide-on-med-and-up left white-text " >
            <ul id="slide-out" className="side-nav">
              <li>
              <a href="#createGroupModal" className="hide-on-med-and-up modal-trigger">
                <i className="material-icons">group_add</i> New Group
              </a>
              </li>
              <li>
              <Link to="group">
                <i className="material-icons">group</i> My Groups
              </Link>
              </li>

              <li><div className="divider"></div></li>
              <li><a className="waves-effect" href="#!">
                <i className="material-icons">account_circle</i> Profile
              </a></li>
              <li>
                <Link to="#" onClick={logout}><i className="material-icons"></i>Logout</Link>
              </li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse left">
              <i className="material-icons">menu</i>
            </a>
          </div>
          
          <ul className="right hide-on-med-and-down">
            <li><Link to="#" ><i className="material-icons">notifications</i></Link></li>
            <li><Link to="/user" ><i className="material-icons">account_circle</i></Link></li>
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
        <GroupForm handleSubmit={props.handleSubmit} />
      </nav>
    </div>
    );
}
export default withRouter(UserNav);
