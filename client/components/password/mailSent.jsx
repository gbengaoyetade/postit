import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../navigation/Nav';

export default () => (
  <div className="row">
    <Nav />
    <div className="col s10 offset-s1 m5 offset-m4 component-container">
      <h2 className="center">Mail Sent</h2>
      <p>A password reset mail has been sent to the address you provided.</p>
      <p>Check your mail and respond accordingly.</p>
      <p><Link to="password_reset">{"Didn't"} get a mail? </Link></p>
    </div>
  </div>
);
