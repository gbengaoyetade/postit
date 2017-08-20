import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../presentational/loginForm.jsx';
import { loginUser, loginLoading } from '../../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log(this.props);
  }
  handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    this.props.user[name] = value;
    console.log(this.props.user);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.setLoading(true);
    this.props.loginUser(this.props.user);
  }
  render() {
    return (
      <LoginForm 
      handleSubmit={this.handleSubmit.bind(this)} 
      handleChange={this.handleChange.bind(this)}
      loading = {this.props.isLoading}
      error = {this.props.loginError}
      />
    ); 
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.loginLogout,
    isLoading: state.loginLoading,
    loginError: state.loginError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user));
    },
    setLoading: (payload) => {
      dispatch(loginLoading(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
