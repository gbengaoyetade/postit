import React from 'react';
import { connect } from 'react-redux';
import validateInput from '../../validateInput';
import { signupLoading, signupUser } from '../../actions/auth';
import SignupForm from './signupForm';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errors: {},
    };
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.props.user[name] = value;
  }
  handleSubmit(e) {
    e.preventDefault();
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
    error: state.signupError,
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
