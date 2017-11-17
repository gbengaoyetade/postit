import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from '../common/Nav';

const ResetPasswordPage = (props) => {
  let disabled, sendValue, progressBar;
  if (props.sending) {
    disabled = 'disabled';
    sendValue = 'Sending';
    progressBar = (
      <div className="progress light-blue lighten-4">
      <div className="indeterminate blue"></div>
    </div>
    );
  } else {
    disabled = '';
    sendValue = 'Send';
    progressBar = '';
  }
  return (
    <div className="row">
      <Nav middleLink="Password Reset" />
        <div className="form-container col s12 m6 offset-m3">
          {progressBar}
          <p className="red-text center flow-text">{props.error} &nbsp;</p>
          <p className="flow-text">
            Enter your email address and we would
            send you a link to reset your password
          </p>
          <form action="" method="Post" onSubmit={props.handleSubmit}>
            <div className="input-field">
              <input type="email" name="email"
              onChange={props.handleChange} required="required" />
              <label htmlFor="email"> Email </label>
            </div>
            <input
            type="submit" value={sendValue}
            className="btn light-blue darken-4" disabled={disabled} />
            <span className="flow-text">
              &nbsp;&nbsp;&nbsp;
              <Link to="/login"> login </Link> instead.</span>
            <p className="clearfix">&nbsp;</p>
          </form>
        </div>

    </div>
  );
};
ResetPasswordPage.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  sending: PropTypes.bool,
};
export default ResetPasswordPage;
