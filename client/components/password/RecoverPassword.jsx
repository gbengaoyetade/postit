import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recoverPassword } from '../../actions/passwordActions';
import RecoverPasswordPage from './RecoverPasswordPage';

/**
 * @class RecoverPassword
 *
 * @extends { React.Component }
 */
export class RecoverPassword extends React.Component {

  /**
   * @description Creates an instance of RecoverPassword.
   *
   * @param {object} props - react props
   *
   * @returns {void} - return nothing
   */
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: ''
    };
  }
  /**
   * @description Handles form submission
   *
   * @param {object} event -event object
   *
   * @returns {void} -return nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.sendEmail(this.state);
  }
  /**
   * @description Handles onChange event
   *
   * @param {object} event -event object
   *
   * @returns {void} - return nothing
   */
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  /**
   * @description render function
   *
   * @returns {jsx} -jsx representation of the component
   */
  render() {
    return (
      <RecoverPasswordPage
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        error={this.props.error.emailError}
        sending={this.props.sending}
      />
    );
  }
}

RecoverPassword.propTypes = {
  email: PropTypes.object,
  sendEmail: PropTypes.func.isRequired,
  error: PropTypes.object,
  sending: PropTypes.bool,
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
    email: state.passwordReducer,
    error: state.passwordReducer,
    sending: state.itemLoadingReducer.sendingMail,
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
    sendEmail: (email) => {
      dispatch(recoverPassword(email));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
