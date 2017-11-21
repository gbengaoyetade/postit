import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import validateInput from '../../validateInput';

import { signupLoading, signupUser } from '../../actions/userAuthActions';
import SignupForm from './SignupForm';

/**
 *
 *
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {
  /**
   * Creates an instance of Signup.
   * @param {object} props -react props object
   * @returns {void} -return void
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: {},
    };
  }
  /**
   * @param {object} event
   * @returns {void}
   */
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.props.user[name] = value.trim();
  }
   /**
   * @param {object} event
   * @returns {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    const { errors, isValid } = validateInput(this.props.user);
    if (!isValid) {
      this.setState({ errors });
    } else {
      this.props.setLoading(true);
      this.props.signupUser(this.props.user, this.props.history);
    }
  }
  render() {
    return (
      <SignupForm
        loading={this.props.isLoading}
        error={this.props.error}
        errors={this.state.errors}
        validate={this.validateInput}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
    );
  }
}
const mapStateToProps = state => (
  {
    user: state.userAuth,
    error: state.authError.signupError,
    isLoading: state.itemLoading,
  }
);
const mapDispatchToProps = dispatch => (
  {
    signupUser: (user, history) => {
      dispatch(signupUser(user, history));
    },
    setLoading: (bool) => {
      dispatch(signupLoading(bool));
    },
  }
);
Signup.propTypes = {
  user: PropTypes.object,
  isLoading: PropTypes.bool,
  setLoading: PropTypes.func.isRequired,
  signupUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.string,
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
