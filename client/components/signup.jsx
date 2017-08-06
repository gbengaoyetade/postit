import React from 'react';
import axios from 'axios';
class Signup extends React.Component {
  shout (e) {
    e.preventDefault();
    const config = {
      headers: { 
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoxLCJpYXQiOjE1MDE5ODgyNTMsImV4cCI6MTUzMzUyNDI1M30.8sCRkYlHtUrQ-Q9vPsenOk6b0TRVUdDez3yoXLRD7uU', 
        'Access-Control-Allow-Headers': '*',
        },
    };
    axios.post('/api/group/1/user', {
      username: 'gbenga',
      email: 'what@gmail.com',
    },config)
    .then((response) => {
      console.log(response.data);
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
