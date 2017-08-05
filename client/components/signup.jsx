import React from 'react';
import axios from 'axios';
class Signup extends React.Component {
  shout (e) {
    e.preventDefault();
    axios.post('/api/user/signin', {
      username: 'gbenga',
      email: 'what@gmail.com',
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        <form method="POST">
          <p> <input type="text" placeholder="Username" /></p>
          <p> <input type="email" placeholder="Email" /></p>
          <p> <input type="password" placeholder="password" /></p>
          <p> <input type="text" placeholder="Phone number" /></p>
          <p> <input type="submit" value="Signup" onClick={this.shout}/></p>
        </form>
      </div>
      );
  }
}
export default Signup;
