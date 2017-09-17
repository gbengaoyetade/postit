import React from 'react';
import { connect } from 'react-redux';
import UserNav from '../presentational/usernav';

export default (Component) => {
  class AuthHoc extends React.Component {
    componentWillMount() {
      if (!window.sessionStorage.postitToken) {
        this.props.history.push('/login');
      }
      console.log(this.props);
    }
    render() {
      return (
        <div>
          <UserNav username={this.props.user.username} />
          <Component {...this.props} />
        </div>
      );
    }
  }
  AuthHoc.proptypes = {
    history: React.PropTypes.object.isRequired,
  };
  const mapStateToProps = state => (
    {
      user: state.userAuth,
    }
  );
  return connect(mapStateToProps)(AuthHoc);
};
