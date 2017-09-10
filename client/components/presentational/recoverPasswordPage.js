import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container';
import PassworNav from './passwordNav';

const ResetPasswordPage = props => (
  <div>
    <PassworNav />
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
