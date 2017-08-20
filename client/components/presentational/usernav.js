import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = (props) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper  light-blue darken-4 ">
          <a href="#!" className="left brand-logo">Postit</a>

          <ul className="right hide-on-med-and-down">
            <li><Link to="#" ><i className="material-icons">notifications</i></Link></li>
            <li><Link to="/user" ><i className="material-icons">account_circle</i></Link></li>
            
          </ul>
          <form className="right">
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
}
export default UserNav;
