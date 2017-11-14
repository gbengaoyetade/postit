import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Nav from '../common/Nav';

export default (Component) => {
  let user, rightLinkObject;
  class AuthHoc extends React.Component {
    componentWillMount() {
      if (!localStorage.getItem('postitToken')) {
        this.props.history.push('/login');
      } else {
        user = JSON.parse(localStorage.getItem('postitUser'));
        rightLinkObject = (
          <a className='dropdown-button' href='#' data-activates='userDropdown'>
            {user.username}
          </a>
        );
      }
    }
    componentWillUpdate() {
      $('.dropdown-button').dropdown();
      $('select').material_select();
      $('.collapsible').collapsible();
    }
    render() {
      return (
        <div>
          <Nav rightLink={rightLinkObject} />
          <div className="component-container">
          <Component {...this.props} />
          </div>
        </div>
      );
    }
  }
  AuthHoc.propTypes = {
    history: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => (
    {
      user: state.userAuth,
    }
  );
  return connect(mapStateToProps)(AuthHoc);
};
