import React from 'react';
import axios from 'axios';
import store from '../store.js';
import createUser from '../reducers/createUser.js';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: '',
      password: '',
      passwordError: '',
      username: '',
    };
  }
  componentWillMount() {
    store.subscribe(() => {
      const thisState = store.getState();
      this.setState({
        username: thisState.user,
      });
    });
  }
  changeState(e) {
    e.preventDefault();
    this.setState({ error: 'this is the error' });
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  }
  validateInput(e) {
    // e.preventDefault();
    this.createUser();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;
    if (password.length < 6){
      this.setState({ passwordError: 'Password length cannot be less than 6 characters' });
    } else{
      this.setState({ passwordError: '' });
      }
    }
  handleSubmit(e) {
    e.preventDefault();
    store.dispatch(createUser(this.state));
    console.log(store.getState());
  }
  render() {
    return (
      <div>
        <form method="POST" onSubmit={this.handleSubmit.bind(this)} >
          <p> <input type="text" name="username" placeholder="Username" onChange={this.handleChange.bind(this)}/><span>{this.state.error}</span></p>
          <p> <input type="email" name="email" placeholder="Email" onChange={this.handleChange.bind(this)}/></p>
          <p> <input type="password" name="password" placeholder="password" onChange={this.handleChange.bind(this)}/>
            <br /> <span>{this.state.user}</span>
          </p>

          <p> <input type="text" name="phonenumber" placeholder="Phone number" onChange={this.handleChange.bind(this)}/></p>
          <p> <input type="submit" value="Signup" /></p>
        </form>
      </div>  
      );
  }
}
export default Signup;
