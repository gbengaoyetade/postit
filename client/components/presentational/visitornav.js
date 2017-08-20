import React from 'react';
import { Link } from 'react-router-dom';

const VisitorNav = (props) => (
  <div>
    <nav>
      <div className="nav-wrapper light-blue darken-4">
        <a href="#!" className="left brand-logo">Postit</a>
        <ul className="right hide-on-med-and-down">
          <li><Link className="btn red" to="/login" > Login </Link> </li>
          <li><Link className="btn light-blue darken-4" to="/signup" > Signup </Link> </li>
        </ul>
      </div>
    </nav>
  </div>
    );
export default VisitorNav;
