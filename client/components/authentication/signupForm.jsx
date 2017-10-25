import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../general/container';
import VisitorNav from '../navigation/visitornav';
import TextInput from '../general/TextInput';

const SignupForm = (props) => {
  let signupValue = '';
  if (props.loading) {
    signupValue = 'Signing up...';
  } else {
    signupValue = 'Signup';
  }
  return (
    <div>
      <VisitorNav />
      <Container>
        <div className="col s12 m6  offset-m3 component-container">
        <p className="header center grey-text big" >Signup</p>
          <p className="red-text">&nbsp; {props.error}</p>
          <form method="POST" action="#" onSubmit={props.handleSubmit}>
            <TextInput
            name="fullName"
            description="Full name"
            handleChange={props.handleChange}
            />
            <span className="red-text">&nbsp;{props.errors.fullName}</span>
            <TextInput
            name="username"
            description="Username"
            handleChange={props.handleChange}
            />
            <span className="red-text">&nbsp;{props.errors.username}</span>
            <TextInput
            name="email"
            description="Email"
            handleChange={props.handleChange}
            />
            <span className="red-text">&nbsp;{props.errors.email}</span>
            <TextInput
            name="phoneNumber"
            description="Phone Number"
            handleChange={props.handleChange}
            errorClass="valid"
            />
            <span className="red-text">&nbsp;{props.errors.phoneNumber}</span>
            <div className="input-field">
              <input type="password" name="password" id="password"
              onChange={props.handleChange} required/>
              <label htmlFor="password"> Password </label>
            </div>
            <span className="red-text">&nbsp;{props.errors.password}</span>
            <p className="row">
              <input
              type="submit" value={signupValue}
              className="btn align-center light-blue darken-4 col s8 offset-s2"
              />
            </p>
            <p className="center"> Already have and acount?
              <Link to="login"> Login </Link>
            </p>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default SignupForm;
