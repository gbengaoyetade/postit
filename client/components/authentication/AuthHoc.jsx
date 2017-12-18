import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserNav from '../common/UserNav';

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
      } else {
        $('.dropdown-button').dropdown();
        $('.collapsible').collapsible();
        user = JSON.parse(localStorage.getItem('postitUser'));
        rightLinkObject = (
          <Link
          className='dropdown-button'
          to='#'
          data-activates='userDropdown'
          >
            {user.username}
          </Link>
        );
      }
    }
    /**
     *
     * @return { void }
     *
     * @memberof AuthHoc
     */
    componentWillUpdate() {
      $('.button-collapse').sideNav();
      $('.dropdown-button').dropdown();
      $('.collapsible').collapsible();
    }
    /**
     * @description render function
     *
     * @returns { object } -returns react element
     */
    render() {
      return (
        <div>
          <UserNav
          rightLink={rightLinkObject}
          history={this.props.history}
          />
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
      user: state.authReducer.user,
    }
  );
  return connect(mapStateToProps)(AuthHoc);
};
