import React from 'react';
import PropTypes from 'prop-types';
import UserNav from '../presentational/usernav';

export default (Component) => {
  class AuthHoc extends React.Component {
    componentWillMount() {
      if (!window.sessionStorage.postitToken) {
        this.props.history.push('/login');
      }
    }
    render() {
      return (
        <div>
          <UserNav username={this.props.username} />
          <Component {...this.props} />
        </div>
      );
    }
  }
  AuthHoc.proptypes = {
    props: PropTypes.node.isRequired,
  };
  return AuthHoc;
};
