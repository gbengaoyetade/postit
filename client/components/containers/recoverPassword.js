import React from 'react';
import { connect } from 'react-redux';
import { recoverPassword } from '../../actions/passwordAction';
import ResetPasswordPage from '../presentational/recoverPasswordPage';

class RecoverPassword extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.sendEmail(this.props.email);
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.props.email[name] = value;
    console.log(this.props.email);
  }
  render() {
    return (
     <ResetPasswordPage />
    );
  }
}
const mapStateToProps = state => (
  {
    email: state.recoverPassword,
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
