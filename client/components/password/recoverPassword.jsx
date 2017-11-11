import React from 'react';
import { connect } from 'react-redux';
import { recoverPassword } from '../../actions/passwordAction';
import ResetPasswordPage from './RecoverPasswordPage';

class RecoverPassword extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.sendEmail(this.props.email);
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.props.email[name] = value;
  }
  render() {
    return (
      <ResetPasswordPage
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        error={this.props.error}
        sending={this.props.sending}
      />
    );
  }
}
const mapStateToProps = state => (
  {
    email: state.recoverPassword,
    error: state.passwordError,
    sending: state.itemLoading,
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
