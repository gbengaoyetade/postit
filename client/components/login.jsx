import React from 'react';

class Login extends React.Component {

  render(){
    return (
      <div>
        <form method="POST" >
          <p> <input type="email" placeholder="Email" /></p>
          <p> <input type="password" placeholder="password" /></p>
          <p> <input type="submit" value="Login" /></p>
        </form>
      </div>
      );
  }
}
export default Login;
