import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Proptypes from 'prop-types';
import Nav from '../common/Nav';
import Container from '../common/Container';
import TextInput from '../common/TextInput';

const SignupForm = (props) => {
  let signupValue = '';
  if (props.loading) {
    signupValue = 'Signing up...';
  } else {
    signupValue = 'Signup';
  }
  return (
    <div>
      <Nav />
      <Container>
        <div className="col s12 m6 offset-m3">
          <div className="form-container">
            <p className="center grey-text big" >Signup</p>
            <p className="red-text">&nbsp; {props.error}</p>
            <form method="POST" action="#" onSubmit={props.handleSubmit}>
              <TextInput
              name="fullName"
              description="Full name"
              handleChange={props.handleChange}
              classnames={classnames('', { invalid: props.errors.fullName })}
              />
              <span className="red-text">&nbsp;{props.errors.fullName}</span>
              <TextInput
              name="username"
              description="Username"
              handleChange={props.handleChange}
              classnames={classnames('', { invalid: props.errors.username })}
              />
              <span className="red-text">&nbsp;{props.errors.username}</span>
              <TextInput
              name="email"
              description="Email"
              handleChange={props.handleChange}
              classnames={classnames('', { invalid: props.errors.email })}
              />
              <span className="red-text">&nbsp;{props.errors.email}</span>
              <TextInput
              name="phoneNumber"
              description="Phone Number"
              handleChange={props.handleChange}
              errorClass="valid"
              classnames={classnames('', { invalid: props.errors.phoneNumber })}
              />
              <span className="red-text">&nbsp;{props.errors.phoneNumber}</span>
              <div className="input-field">
                <input type="password" name="password" id="password"
                onChange={props.handleChange}
                className={classnames('input',
                { invalid: props.errors.password })}
                required />
                <label htmlFor="password"> Password </label>
              </div>
              <span className="red-text" >&nbsp;{props.errors.password}</span>
              <p className="row">
                <input
                type="submit" value={signupValue}
                className=
                "btn align-center light-blue darken-4 col s8 offset-s2"
                />
              </p>
              <p className="center"> Already have and acount?
                <Link to="login"> Login </Link>
              </p>
              <p></p>
            </form>
        </div>
        </div>
      </Container>
    </div>
  );
};
SignupForm.propTypes = {
  errors: Proptypes.object,
  handleChange: Proptypes.func.isRequired,
  handleSubmit: Proptypes.func.isRequired,
  error: Proptypes.string,
  loading: Proptypes.bool,
};
export default SignupForm;
