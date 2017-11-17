import React from 'react';
import { connect } from 'react-redux';
import 'url-search-params-polyfill';
import { InputField, Submit } from '../common/Forms';
import Nav from '../common/Nav';
import { updatePassword } from '../../actions/passwordAction';

class ChangePassword extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      error: '',
      password: '',
      confirmPassword: '',
    };
  }
  validateForm() {
    if (this.state.password.length < 6) {
      this.setState({ error: 'Password cannot be less than 6 characters' });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: 'Passwords did not match' });
    } else if (this.state.password.trim().length === 0) {
      this.setState({ error: 'Password cannot be all spaces' });
    } else {
      return true;
    }
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const search = new URLSearchParams(this.props.location.search);
    const validate = this.validateForm(event);
    const token = search.get('token');
    if (validate) {
      this.props.updatePassword({ password: this.state.password }, token);
    }
  }
  render() {
    return (
      <div className="row">
        <Nav middleLink="Password Reset" />
          <div className="form-container col s10 offset-s1 m4 offset-m4">
            <p className="big center"> Password Reset</p>
            <p className="red-text center flow-text">
              {this.state.error} &nbsp;
            </p>
            <form onSubmit={this.handleSubmit} >
              <InputField
              type="password" required="required"
              labelValue="Password" name="password"
              handleChange={this.handleChange} />
              <InputField
              type="password" required="required"
              labelValue="Confirm Password" name="confirmPassword"
              handleChange={this.handleChange} />
              <Submit submitValue="Reset Password" />
              <p> &nbsp; </p>
            </form>
          </div>
        </div>
    );
  }
}
const mapDispatchToProps = dispatch => (
  {
    updatePassword: (password, token) => {
      dispatch(updatePassword(password, token));
    },
  }
);

export default connect(null, mapDispatchToProps)(ChangePassword);
