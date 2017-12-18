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
   * @param { object } props - react props
   *
   * @returns { void } - return nothing
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
   * @param { object } event -event object
   *
   * @returns { void } -return nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.sendEmail(this.state);
  }
  /**
   * @description Handles onChange event
   *
   * @param { object } event -event object
   *
   * @returns { void } - return nothing
   */
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  /**
   * @description render function
   *
   * @returns { object } -returns react element
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

const mapStateToProps = state => (
  {
    email: state.passworReducer,
    error: state.passworReducer,
    sending: state.itemLoadingReducer.sendingMail,
  }
);
const mapDispatchToProps = dispatch => (
  {
    sendEmail: (email) => {
      dispatch(recoverPassword(email));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
