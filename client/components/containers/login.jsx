import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../presentational/loginForm';
import { loginUser, loginLoading, loginError } from '../../actions/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
     if(window.sessionStorage.postitToken) {
       this.props.history.push('/dashboard');
    }
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.user[name] = value;
    console.log(this.props.user);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setLoginError('');
    this.props.setLoading(true);
    this.props.loginUser(this.props.user);
  }
  render() {
    return (
      <LoginForm 
      handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
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
    setLoginError: (error) => {
      dispatch(loginError(error));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
