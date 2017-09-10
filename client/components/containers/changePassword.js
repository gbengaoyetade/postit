import React from 'react';
import { connect } from 'react-redux';
import { InputField, Submit } from '../presentational/forms';
import PasswordNav from '../presentational/passwordNav';
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
  validateForm(event) {
    if (this.state.password.length < 6) {
      this.setState({ error: 'Password cannot be less than 6 characters' });
    }
    else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ error: 'Passwords did not match' });
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
    console.log(this.state);
    const validate = this.validateForm(event);
    if (validate) {
      this.props.updatePassword({ password: this.state.password });
    }
  }
  render() {
    return (
      <div>
      <PasswordNav />
      <div className="row">
        <div className="component-container col s10 offset-s1">
          <p className="red-text"> {this.state.error} </p>
          <form onSubmit={this.handleSubmit} >
            <InputField type="password" required="required" labelValue="Password" name="password" handleChange={this.handleChange} />
            <InputField type="password" required="required" labelValue="Confirm Password" name="confirmPassword" handleChange={this.handleChange} />
            <Submit submitValue="Reset Password" />
          </form>
        </div>
      </div>
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
  }
);
const mapDispatchToProps = dispatch => (
  {
    updatePassword: (password) => {
      dispatch(updatePassword(password));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
