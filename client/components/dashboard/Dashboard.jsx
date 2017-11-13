import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getGroups } from '../../actions/groupActions';
import AppNav from '../navigation/AppNav';

class Dashboard extends React.Component {
  componentWillMount() {
    $('.dropdown-button').dropdown();
    $('select').material_select();
  }
  render() {
    let groups;
    let userGroups;
    if (this.props.groups.groups) {
      groups = this.props.groups.groups;
      userGroups = (
        groups.map(group => (
          <div className="postitCard col m3 s5" key={group.id}>
          <p className="header">
            <Link to={`/group/${group.id}`}> {group.groupName}</Link>
          </p>
          <p>{group.groupDescription} </p>
          <p className="postitCardFooter">
            Active: <span>3 mins ago </span>
          </p>
        </div>
        ))
      );
    }
    return (
      <div className="row">
        <AppNav />
        <div className="col m6 s12 component-container">
          <p className="center header">Your Groups</p>
          <div className="divider"/>
          {userGroups}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
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
