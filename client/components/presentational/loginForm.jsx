import React from 'react';

const Login = (props) => {
  return (
    <div>
      <form method="POST" onSubmit={props.handleSubmit.bind(this)}>
        <p> <input type="email" name="email" placeholder="Email" onChange={props.handleChange.bind(this)}/></p>
        <p> <input type="password" name="password" placeholder="password" onChange={props.handleChange.bind(this)}/></p>
        <p> <input type="submit" value="Login" /></p>
      </form>
    </div>
  );
}
export default Login;
