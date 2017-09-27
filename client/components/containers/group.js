import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getGroupMessages, getGroupMembers, leaveGroup, sendUserMessage } from '../../actions/groupAction';
import SideNav from '../presentational/userSideNav.jsx';
import DashboardHeader from '../presentational/dashboardHeader.jsx';
import Messages from './messages.jsx';

class Group extends React.Component {
  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.props.getMessages(groupId);
    this.props.getGroupMembers(groupId);
  }
  componentWillUpdate() {
    $('.dropdown-button').dropdown();
    $('select').material_select();
  }

  render() {
    const groupId = this.props.match.params.groupId;
    let numberOfGroupMembers;
    let groupMessages;
    let groupName;
    if (this.props.groupMembers.members) {
      groupName = this.props.groupMembers.members.group.groupName;
      numberOfGroupMembers = this.props.groupMembers.members.users.length;
    }
    return (
      <div className="row">
        <div>
          <SideNav groupId={groupId} numberOfGroupMembers={numberOfGroupMembers} groupName={groupName} />
            <ul id="group-more" className="dropdown-content">
              <li><Link to={`/group/${groupId}/addmembers`}>Add Members</Link></li>
              <li><a href="#!">Leave group</a></li>
            </ul>
          <div className="col s10 offset-s1 m6   s10 component-container">
            <Messages groupId={this.props.match.params.groupId} />
          </div>
        </div>
        {/* <GroupMembers groupId={this.props.match.params.groupId} history={this.props.history} /> */}
      </div>
    );
  }
}
Group.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  // groupId: PropTypes.number.isRequired,
};
const mapStateToProps = state => (
  {
    group: state.groupReducer,
    messages: state.getUserGroupMessages,
    groupMembers: state.getGroupMembers,
    message: state.postMessageReducer,
    messageSuccess: state.sendMessageSuccess,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getMessages: (groupId) => {
      dispatch(getGroupMessages(groupId));
    },
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
    leaveGroup: (groupId) => {
      dispatch(leaveGroup(groupId));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Group);
