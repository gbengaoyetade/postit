import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getGroups } from '../../actions/groupAction';
import UserDashboard from '../presentational/userDashboard.jsx';

class Dashboard extends React.Component {
  componentWillMount() {

  }
  componentDidMount() {
    this.props.getGroups();
    console.log(this.props);
  }
  render() {
    let groups;
    let userGroups;
    if (this.props.groups.groups) {
      console.log(this.props.user);
      groups = this.props.groups.groups;
      console.log('groups', this.props.groups.groups);
      userGroups = (
        <ul>
          {groups.map(group => (
            <li key={group.id}><Link to={`/group/${group.id}`}> {group.groupName} </Link> </li>
            ))}
        </ul>);
    }
    return (
      <div>
        <UserDashboard userGroups={userGroups} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  userGroupSuccess: PropTypes.bool.isRequired,
  // groups: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    groups: state.userGroupReducer,
    userGroupSuccess: state.getUserGroupSuccess,
    user: state.userAuth,
    error: state.loginError,
  }
);
const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => {
      dispatch(getGroups());
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));