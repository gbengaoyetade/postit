import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { loginUser, loginLoading, loginError }
from '../../actions/userAuthActions';

/**
 *
 * @class Signup
 * @extends { React.Component }
 */
class Login extends React.Component {
  /**
   * @description Creates an instance of Login.
   *
   * @param {object} props -prop object
   *
   * @returns {void} -returns nothing
   */
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { password: '', username: '' };
  }
/**
 * @description handles onChange event
 *
 * @param {object} event -event element
 *
 * @returns {void} -return nothing
 */
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  /**
   * @description handles submit event
   *
   * @param {object} event - The event object
   *
   * @returns {void} -returns nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.setLoginError('');
    this.props.setLoading(true);
    this.props.loginUser(this.state, this.props.history);
  }

  /**
   * @description renders component
   *
   * @returns {jsx} -jsx representation of the component
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
  isLoading: Proptypes.bool,
  loginError: Proptypes.string,
  loginUser: Proptypes.func.isRequired,
  setLoginError: Proptypes.func.isRequired,
  setLoading: Proptypes.func.isRequired,
  history: Proptypes.object.isRequired,
  user: Proptypes.object,
};

  /**
   * @description Maps state to props
   *
   * @param {object} state -application state
   *
   * @returns {object} -returns part of the state
  */
const mapStateToProps = state => (
  {
    user: state.authReducer.user,
    isLoading: state.itemLoadingReducer.loginLoading,
    loginError: state.authReducer.loginError,
  }
);

/**
 * @description Maps dispatch to props
 *
 * @param {function} dispatch -dispatch function
 *
 * @returns {object} -actions to be dispatched
 */
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
