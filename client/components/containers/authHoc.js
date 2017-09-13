import React from 'react';
import PropTypes from 'prop-types';
import UserNav from '../presentational/usernav';

export default (Component) => {
  class AuthHoc extends React.Component {
    componentWillMount() {
      if (!window.sessionStorage.postitToken) {
        props.history.push('/login');
      }
    }
    render() {
      return (
        <div>
          <UserNav />
          <Component {...this.props} />
        </div>
      );
    }
  }
  // AuthHoc.proptypes = {
  //   props: PropTypes.node.isRequired,
  // };
  return AuthHoc;
};
