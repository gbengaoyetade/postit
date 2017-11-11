import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getGroups, getGroupMembers, getGroupMessages }
from '../../actions/groupActions';

class UserGroups extends React.Component {
  constructor() {
    super();
    this.getGroupData = this.getGroupData.bind(this);
  }
  componentDidMount() {
    this.props.getGroups();
  }
  getGroupData(groupId) {
    this.props.getMessages(groupId);
    this.props.getGroupMembers(groupId);
  }
  render() {
    let groups;
    let userGroups;
    if (this.props.groups.groups) {
      groups = this.props.groups.groups;
      userGroups = (
        <ul className="collection scrollable-ul">
          {groups.map(group => (
            <li key={group.id} className="collection-item"><Link
              to={`/group/${group.id}`}
              onClick={() => this.getGroupData(group.id)}
            > {group.groupName} </Link> </li>
            ))}
        </ul>);
    }
    return (
        <div className="scrollable-component">
          {userGroups}
        </div>
    );
  }
}
UserGroups.propTypes = {
  getGroups: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    groups: state.userGroupReducer,
  }
);
const mapDispatchToProps = dispatch => (
  {
    getGroups: () => {
      dispatch(getGroups());
    },
    getMessages: (groupId) => {
      dispatch(getGroupMessages(groupId));
    },
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
  }
);
export default
withRouter(connect(mapStateToProps, mapDispatchToProps)(UserGroups));
