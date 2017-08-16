import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  return (
    <div>
      <form method="POST" onSubmit={props.handleSubmit.bind(this)}>
        <p> <input type="text" name="username" placeholder="Username" onChange={props.handleChange.bind(this)}/></p>
        <p> <input type="password" name="password" placeholder="password" onChange={props.handleChange.bind(this)}/></p>
        <p> <input type="submit" value="Login" className="btn" /> Don't have an account?  
          <Link to="/signup" >Signup </Link>
        </p>
      </form>
      <p>  </p>
    </div>
  );
}
export default Login;
