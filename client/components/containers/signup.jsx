import React from 'react';
import { connect } from 'react-redux';
import createUser from '../../actions/createUser';
import sendUserData from '../../actions/sendUserData';
import { signupLoading } from '../../actions/auth';
import SignupForm from '../presentational/signupForm.jsx';

class Signup extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
     if(window.sessionStorage.postitToken){
       this.props.history.push('/dashboard');
    }
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
    this.props.setLoading(true);
    this.props.signupUser(this.props.user);
  }
  render() {
    return (
        <SignupForm 
          loading={this.props.isLoading} 
          error={this.props.error} 
          validate={this.validateInput.bind(this)} 
          handleSubmit={this.handleSubmit.bind(this)} 
          handleChange={this.handleChange.bind(this)} 
        />
      );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.createAccount,
    error: state.signupError,
    isLoading: state.signupLoading,
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
    setLoading: (bool) => {
      dispatch(signupLoading(bool));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
