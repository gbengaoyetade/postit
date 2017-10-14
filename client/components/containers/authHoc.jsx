import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserNav from '../presentational/usernav';

export default (Component) => {
  class AuthHoc extends React.Component {
    componentWillMount() {
      if (!localStorage.getItem('postitToken')) {
        this.props.history.push('/login');
      }
    }
    render() {
      return (
        <div>
          <UserNav username={localStorage.getItem('username')} />
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
