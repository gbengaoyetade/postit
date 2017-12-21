import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { loginUser, loginLoading, loginError }
from '../../actions/userAuthActions';

/**
 * @description -Login Class
 */
class Login extends React.Component {
  /**
   * Creates an instance of Login.
   * @param {object} props -react props
   * @memberof Login
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = { password: '', username: '' };
  }
/**
 *
 * @param {object} event -event element
 * @returns {void} -return nothing
 */
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
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
    this.props.loginUser(this.state, this.props.history);
  }

  /**
   * @returns {object} -returns a react element
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
  isLoading: Proptypes.bool,
  loginError: Proptypes.string,
  loginUser: Proptypes.func.isRequired,
  setLoginError: Proptypes.func.isRequired,
  setLoading: Proptypes.func.isRequired,
  history: Proptypes.object.isRequired,
  user: Proptypes.object,
};
const mapStateToProps = state => (
  {
    user: state.authReducer.user,
    isLoading: state.itemLoadingReducer.loginLoading,
    loginError: state.authReducer.loginError,
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
