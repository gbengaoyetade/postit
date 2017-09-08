import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container';

const ResetPasswordPage = props => (
    <div>
    <nav>
        <div className="nav-wrapper light-blue darken-4">
        <div className="row">
          <div className="col s2 offset-s1 hide-on-med-and-down">
          <h5 className="center brand-logo"> <span > Password Reset </span></h5>
          </div>
          <div className="col s2 offset-s2 hide-on-med-and-up">
            <a href="#!" className="center brand-logo">Postit</a>
          </div>
        </div>
        </div>
      </nav>
    <Container>
      <div className="component-container">
        <p>Enter your email address and we would send you a link to reset your password</p>
        <form action="" method="Post" onSubmit={props.handleSubmit}>
          <div className="input-field">
            <input type="text" name="email" onChange={props.handleChange} />
            <label htmlFor="email"> Email </label>
          </div>
          <input type="submit" value="Send" className="btn light-blue darken-4 " />
          <span> &nbsp;&nbsp;&nbsp;<Link to="login"> login </Link> instead. </span>
        </form>
      </div>
    </Container>
    </div>
);
export default ResetPasswordPage;
