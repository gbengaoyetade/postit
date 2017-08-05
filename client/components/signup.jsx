import React from 'react';

class Signup extends React.Component {	
	
  render() {
    return (
      <div>
        <form method="POST">
          <p> <input type="text" placeholder="Username" /></p>
          <p> <input type="email" placeholder="Email" /></p>
          <p> <input type="password" placeholder="password" /></p>
          <p> <input type="text" placeholder="Phone number" /></p>
          <p> <input type="submit" value="Signup" /></p>
        </form>
      </div>
      );
  }
}
export default Signup;
