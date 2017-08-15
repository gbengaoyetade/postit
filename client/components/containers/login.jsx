import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../presentational/loginForm.jsx';
import loginUser from '../../actions/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.props.user[name] = value;
    console.log(this.props.user);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.loginUser(this.props.user);
    console.log(this.props);
  }
  render() {
    return (
      <LoginForm 
      handleSubmit={this.handleSubmit.bind(this)} 
      handleChange={this.handleChange.bind(this)}
      />
    ); 
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.loginLogout,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
