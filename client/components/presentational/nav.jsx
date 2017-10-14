import React from 'react';

const PasswordNav = props => (
  <nav className="light-blue darken-4">
    <div className="nav-wrapper">
    <div className="row">
      <div className="col s2 offset-s1 hide-on-med-and-down">
      <h5 className="center brand-logo"> <span > {props.page} </span></h5>
      </div>
      <div className="col s2 offset-s2 hide-on-med-and-up">
        <a href="#!" className="center brand-logo">Postit Reset</a>
      </div>
    </div>
    </div>
  </nav>
);
export default PasswordNav;
