import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { getGroups } from '../../actions/groupActions';
import AppNav from '../navigation/AppNav';
/**
 * -Dashboard class
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  /**
   * -render fucntion
   * @returns {object} -jsx
   * @memberof Dashboard
   */
  render() {
    let groups;
    let userGroups;
    if (this.props.groups.groups) {
      groups = this.props.groups.groups;
      userGroups = (
        groups.map(group => (
          <div className="postit-card col m3 s5" key={group.id}>
          <p className="header">
            <Link to={`/group/${group.id}`}> {group.groupName}</Link>
          </p>
          <p>{group.groupDescription} </p>
          <p className="bottom-element">
            Active: <span className="bold">
            {group.messages[0] ?
              moment(group.messages[0].updatedAt).fromNow() :
              'Not yet active' }
            </span>
          </p>
        </div>
        ))
      );
    }
    return (
      <div className="row">
        <AppNav />
        <div className="col m6 s12 component-container">
          <p className="center header">My Groups</p>
          <div className="divider"/>
          {userGroups}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    groups: state.userGroupReducer,
    userGroupSuccess: state.getUserGroupSuccess,
    user: state.userAuth,
    error: state.loginError,
  }
);
const mapDispatchToProps = dispatch => (
  {
    getGroups: () => {
      dispatch(getGroups());
    },
  }
);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard));
