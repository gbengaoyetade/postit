import React from 'react';
import { Link } from 'react-router-dom';

const VisitorNav = (props) => {
  return (
       <div>
      <nav>
        <div className="nav-wrapper blue ">
          <a href="#!" className="left brand-logo">Postit</a>
          <ul className="right hide-on-med-and-down">
            <li><Link className="btn red" to="/login" > Login </Link> </li>
            <li><Link className="btn blue" to="/signup" > Signup </Link> </li>
          </ul>
        </div>
      </nav>
    </div>
    );
}
export default VisitorNav;