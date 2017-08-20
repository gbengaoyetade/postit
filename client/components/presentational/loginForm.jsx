import React from 'react';
import { Link } from 'react-router-dom';
import Home from './home';
import VisitorNav from './visitornav';

const Login = (props) => {
  let loginValue = '';
  if (props.loading) {
    loginValue = 'Login in...';
  } else {
    loginValue = 'Login';
  } 
  return (
    <div>
      <VisitorNav />
      <Home>
      <div className="col s10 offset-s1 l6 offset-l3" >
      <p className="red-text"> {props.error} </p>
      <form method="POST" onSubmit={props.handleSubmit.bind(this)} >
        <div className="input-field">
          <input type="text" name="username" id="username" onChange={props.handleChange.bind(this)}/>
          <label htmlFor="username">Username</label>
        </div> 
        <div className="input-field">
          <input type="password" name="password" id="password" onChange={props.handleChange.bind(this)}/>
          <label htmlFor="password">Password</label>
        </div>
        <p> <input type="submit" value={loginValue} className="btn blue" />
          <span> Don't have an account?  </span> 
          <Link to="/signup" className="waves-effect"> Signup </Link>
        </p>
      </form>
      </div>
      </Home>
    </div>
  );
}
export default Login;
