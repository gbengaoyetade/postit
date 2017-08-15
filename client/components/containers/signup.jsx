import React from 'react';
import { connect } from 'react-redux';
import createUser from '../../actions/createUser';
import sendUserData from '../../actions/sendUserData';
import SignupForm from '../presentational/signupForm.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.props.user[name] = value;
    console.log(this.props.user);
  }
  validateInput(e) {
    const User = this.props.user;
    if(!User.username || !User.password || !User.email || !User.phoneNumber)
    {
      // this.props.error = 'One or more input fields are empty';
      alert('One or more input fields are empty');
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.signupUser(this.props.user);
  }
  render() {
    return (
        <SignupForm validate={this.validateInput.bind(this)} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange.bind(this)} shouts="Gbenga" />
      );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.createAccount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => { 
      dispatch(createUser(user));
    },
    signupUser: (user) => {
      dispatch(sendUserData(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
