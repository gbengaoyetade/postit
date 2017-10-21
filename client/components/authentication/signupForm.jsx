import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../general/container';
import VisitorNav from '../navigation/visitornav';

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
        <h1 className="header center grey-text" >Signup</h1>
          <p className="red-text">&nbsp; {props.error}</p>
          <form method="POST" action="#" onSubmit={props.handleSubmit.bind(this)}>

            <div className="input-field">
              <input type="text" name="fullName" id="fullName" onChange={props.handleChange.bind(this)} required />
              <label htmlFor="fullName"> Full Name </label>
            </div>

            <div className="input-field">
              <input type="text" name="username" id="username" onChange={props.handleChange.bind(this)} required />
              <label htmlFor="username"> Username </label>
            </div>

            <div className="input-field">
              <input type="email" name="email" onChange={props.handleChange.bind(this)} required/>
              <label htmlFor="email"> Email </label>
            </div>

            <div className="input-field">
              <input type="tel" name="phoneNumber" id="phoneNumber" onChange={props.handleChange.bind(this)} required />
              <label htmlFor="phoneNumber"> Phone Number</label>
            </div>

            <div className="input-field">
              <input type="password" name="password" onChange={props.handleChange.bind(this)} required />
              <label htmlFor="password"> Password </label>
            </div>

            <p className="row">
              <input type="submit" value={signupValue} className="btn align-center light-blue darken-4 col s8 offset-s2" />
            </p>
            <p className="center"> Already have and acount? <Link to="login"> Login </Link> </p>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default SignupForm;
