import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import Nav from '../common/Nav';
import InputField from '../common/InputField';
import SubmitButton from '../common/SubmitButton';

/**
 * @description Login component
 *
 * @param {object} props -prop object
 *
 * @returns {jsx} -jsx representation of the component
 */
const LoginForm = (props) => {
  let submitValue = '';
  let disabled = '';
  if (props.loading) {
    submitValue = 'Loging in...';
    disabled = 'disbaled';
  } else {
    submitValue = 'Login';
    disabled = '';
  }
  return (
    <div className="row">
      <Nav />
      <div className="col s12 m4 offset-m4" >
        <div className="form-container">
      <h3 className="header center grey-text" >
        Login
      </h3>
      <p className="red-text center"> {props.error} &nbsp; </p>
      <form method="POST" onSubmit={props.handleSubmit} >
        <InputField
          type="text"
          name="username"
          required="required"
          handleChange={props.handleChange}
          labelValue= {'Email or username'}
          />
          <InputField
          type="password"
          name="password"
          required="required"
          handleChange={props.handleChange}
          labelValue= {'password'}
          />
        <SubmitButton
        disabled={disabled}
        submitValue={submitValue}
        />
        <p className="center">
          <span>
            Don't have an account? &nbsp;
          </span>
          <Link to="/signup" className="waves-effect">
            Signup
          </Link>
        </p>
        <p className="center">
          <Link
          to="/password/reset"
          id="password-reset"
          className="waves-effect">
            Forgot password
          </Link>
        </p>
        <p>&nbsp;</p>
      </form>
      </div>
      </div>
    </div>
  );
};
LoginForm.propTypes = {
  error: Proptypes.string,
  handleChange: Proptypes.func.isRequired,
  handleSubmit: Proptypes.func.isRequired,
  loading: Proptypes.bool.isRequired
};
export default LoginForm;
