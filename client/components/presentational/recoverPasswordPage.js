import React from 'react';
import { Link } from 'react-router-dom';
import Container from './container';
import PassworNav from './passwordNav';

const ResetPasswordPage = props => {
  let disabled;
  if (props.sending) {
    disabled = 'disabled';
  } else {
    disabled = '';
  }
  return (
    <div>
      <PassworNav />
      <Container>
        <div className="component-container col s12 m6 offset-m3">
          <p className="red-text flow-text">{props.error} &nbsp;</p>
          <p className="flow-text">Enter your email address and we would send you a link to reset your password</p>
          <form action="" method="Post" onSubmit={props.handleSubmit}>
            <div className="input-field">
              <input type="email" name="email" onChange={props.handleChange} required="required" />
              <label htmlFor="email"> Email </label>
            </div>
            <input type="submit" value="Send" className="btn light-blue darken-4 " disabled={disabled} />
            <span className="flow-text"> &nbsp;&nbsp;&nbsp;<Link to="login"> login </Link> instead. </span>
            <p className="clearfix">&nbsp;</p>
          </form>
        </div>
      </Container>
    </div>
  );
}
export default ResetPasswordPage;
