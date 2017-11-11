import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Nav from '../common/Nav';


const Login = (props) => {
  let loginValue = '';
  if (props.loading) {
    loginValue = 'Loging in...';
  } else {
    loginValue = 'Login';
  }
  return (
    <div>
      <Nav />
      <Container>
      <div className="col s12 m6 offset-m3" >
        <div className="component-container">
      <h3 className="header center grey-text" >Login</h3>
      <p className="red-text"> {props.error} </p>
      <form method="POST" onSubmit={props.handleSubmit} >
        <div className="input-field">
          <input type="text" name="username" id="username" required="required"
            onChange={props.handleChange}
          />
          <label htmlFor="username"> Email or username</label>
        </div>
        <div className="input-field">
          <input type="password" name="password" id="password"
            onChange={props.handleChange}
            required="required"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="row">
          <input type="submit" value={loginValue}
          className="btn light-blue darken-4 col s8 offset-s2" />
        </div>
        <p className="center">
          <span> Don't have an account? </span>
          <Link to="/signup" className="waves-effect"> Signup </Link>
        </p>
        <p className="center">
          <Link to="/password_reset" className="waves-effect">
            Forgot password
          </Link>
        </p>
        <p>&nbsp;</p>
      </form>
      </div>
      </div>
      </Container>
    </div>
  );
};
Login.propTypes = {
  error: Proptypes.string,
  handleChange: Proptypes.func.isRequired,
  handleSubmit: Proptypes.func.isRequired,
  loading: Proptypes.bool.isRequired
};
export default Login;
