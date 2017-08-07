import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
    this.shout = this.shout.bind(this);
  }
  changeState(e) {
    e.preventDefault();
    this.setState({ error: 'this is the error' });
  }
  shout(e) {
    e.preventDefault();
    axios.post('/api/user/signup', {
      username: 'gbenga',
      email: 'what@gmail.com',
      password: 'password',
    })
    .then((response) => {
      this.setState({ error: response.data.error });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        <form method="POST">
          <p> <input type="text" placeholder="Username" /><span>{this.state.error}</span></p>
          <p> <input type="email" placeholder="Email" /></p>
          <p> <input type="password" placeholder="password" /></p>
          <p> <input type="text" placeholder="Phone number" /></p>
          <p> <input type="submit" value="Signup" onClick={this.shout} /></p>
        </form>
      </div>
      );
  }
}
export default Signup;
