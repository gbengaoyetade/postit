import React from 'react';
import Home from './home';
import VisitorNav from './visitornav';

const SignupForm = props => (
  <div>
    <VisitorNav />
    <Home>
      <div className="col s8 m6 l6 offset-3">
        <form method="POST" action="#" onSubmit={props.handleSubmit.bind(this)}>

          <div className="input-field">
            <input type="text" name="fullName" id="fullName" onChange={props.handleChange.bind(this)} />
            <label htmlFor="fullName"> Full Name </label>
          </div>

          <div className="input-field">
            <input type="text" name="username" id="username" onChange={props.handleChange.bind(this)} />
            <label htmlFor="username"> Username </label>
          </div>

          <div className="input-field">
            <input type="email" name="email" onChange={props.handleChange.bind(this)} />
            <label htmlFor="email"> Email </label>
          </div>

          <div className="input-field">
            <input type="text" name="phoneNumber" id="phoneNumber" onChange={props.handleChange.bind(this)} />
            <label htmlFor="phoneNumber"> Phone Number</label>
          </div>

          <div className="input-field">
            <input type="password" name="password" onChange={props.handleChange.bind(this)} />
            <label htmlFor="password"> Password </label>
          </div>

          <input type="submit" value="Signup" className="btn align-center blue" />
        </form>
      </div>
    </Home>
  </div>
  );
export default SignupForm;
