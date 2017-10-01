import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Authenticate extends React.Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      this.props.children
    );
  }
}
const mapStateToProps = state => (
  {
    isLoggedIn: state.auth,
  }
);
Authenticate.propTypes = {
  children: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  push: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(withRouter(Authenticate));
