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
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.user[name] = value;
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setLoginError('');
    this.props.setLoading(true);
    this.props.loginUser(this.props.user, this.props.history);
  }
  render() {
    return (
      <LoginForm 
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        loading={this.props.isLoading}
        error={this.props.loginError}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userAuth,
    isLoading: state.loginLoading,
    loginError: state.loginError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user, history) => {
      dispatch(loginUser(user, history));
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
