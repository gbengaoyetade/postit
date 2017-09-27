import React from 'react';
import { Link } from 'react-router-dom';

const VisitorNav = (props) => (
  <div>
    <nav className="light-blue darken-4">
      <div className="nav-wrapper">
      <div className="row">
        <div className="col s2 offset-s1 hide-on-med-and-down">
        <a href="#!" className="left brand-logo">Postit</a>
        </div>
        <div className="col s2 offset-s2 hide-on-med-and-up">
          <a href="#!" className="center brand-logo">Postit</a>
        </div>
        <div className="col s2 push-s7" >
        <ul className="hide-on-med-and-down">
          <li><Link className="" to="/login" > Login </Link> </li>
          <li><Link className="" to="/signup" > Signup </Link> </li>
        </ul>
        </div>
      </div>
      </div>
    </nav>
  </div>
    );
export default VisitorNav;
