import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserNav from '../common/UserNav';
import AppNav from '../common/AppNav';

export default (Component) => {
  let user, rightLinkObject;

  /**
   *
   * @class AuthHoc
   *
   * @extends { React.Component }
   */
  class AuthHoc extends React.Component {
    /**
     *
     * @returns { void } -returns nothing
     */
    componentWillMount() {
      if (!localStorage.getItem('postitToken')) {
        this.props.history.push('/login');
      }
    }

    /**
     *
     * @return { void }
     *
     * @memberof AuthHoc
     */
    componentDidMount() {
      $('.dropdown-button').dropdown();
      $('.collapsible').collapsible();
      $('.button-collapse').sideNav();
    }
    /**
     * @description render function
     *
     * @returns { object } -returns react element
     */
    render() {
      user = JSON.parse(localStorage.getItem('postitUser'));
      rightLinkObject = (
        <Link
        className='dropdown-button'
        to='#'
        id="username"
        data-activates='userDropdown'
        >
          {user.username}
        </Link>
      );
      return (
        <div>
          <UserNav
          rightLink={rightLinkObject}
          history={this.props.history}
          />
          <div className="component-container row">
          <AppNav />
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
      user: state.authReducer.user,
    }
  );
  return connect(mapStateToProps)(AuthHoc);
};
