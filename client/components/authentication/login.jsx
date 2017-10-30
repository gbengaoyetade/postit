import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { loginUser, loginLoading, loginError } from '../../actions/auth';

/**
 * 
 */
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
  /**
   * @param {object} event - The event object
   * @returns {void}
   * @memberof Login
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.setLoginError('');
    this.props.setLoading(true);
    this.props.loginUser(this.props.user, this.props.history);
  }

  /**
   * @returns {}
   * @memberof Login
   */
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
Login.propTypes = {
  isLoading: Proptypes.bool.isRequired,
  loginError: Proptypes.string,
  loginUser: Proptypes.func.isRequired,
  setLoginError: Proptypes.func.isRequired,
  setLoading: Proptypes.func.isRequired,
  history: Proptypes.object.isRequired,
  user: Proptypes.object.isRequired,
};
const mapStateToProps = state => (
  {
    user: state.userAuth,
    isLoading: state.loginLoading,
    loginError: state.loginError,
  }
);
const mapDispatchToProps = dispatch => (
  {
    loginUser: (user, history) => {
      dispatch(loginUser(user, history));
    },
    setLoading: (payload) => {
      dispatch(loginLoading(payload));
    },
    setLoginError: (error) => {
      dispatch(loginError(error));
    },
  }
);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
