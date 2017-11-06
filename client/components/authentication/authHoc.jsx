import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNav from '../navigation/Usernav';

export default (Component) => {
  let user;
  class AuthHoc extends React.Component {
    componentWillMount() {
      if (!localStorage.getItem('postitToken')) {
        this.props.history.push('/login');
      }
      user = JSON.parse(localStorage.getItem('postitUser'));
    }
    render() {
      return (
        <div>
          <UserNav username={user.username} />
          <Component {...this.props} />
        </div>
      );
    }
  }
  AuthHoc.proptypes = {
    history: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => (
    {
      user: state.userAuth,
    }
  );
  return connect(mapStateToProps)(AuthHoc);
};
