import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getGroupMessages, getGroupMembers, leaveGroup }
from '../../actions/groupActions';
import AppNav from '../navigation/AppNav';
import Messages from '../message/Messages';
import MessageForm from '../message/MessageForm';

class Group extends React.Component {
  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.props.getMessages(groupId, this.props.history);
    this.props.getGroupMembers(groupId);
  }
  componentWillUpdate() {
    $('.dropdown-button').dropdown();
    $('select').material_select();
  }
  leaveGroup() {
    const groupId = this.props.match.params.groupId;
    this.props.leaveGroup(groupId, this.props.history);
  }
  render() {
    const groupId = this.props.match.params.groupId;
    let numberOfGroupMembers;
    let groupName;
    if (this.props.groupMembers.members) {
      groupName = this.props.groupMembers.members.group.groupName;
      numberOfGroupMembers = this.props.groupMembers.members.users.length;
    }
    return (
      <div className="row">
        <div>
          <AppNav
            groupId={groupId}
            useHeader='true'
            numberOfGroupMembers={numberOfGroupMembers}
            groupName={groupName}
          />
            <ul id="group-more" className="dropdown-content">
              <li><Link to={`/group/${groupId}/addmembers`}>Add Memb</Link></li>
              <li><a href="#" onClick={this.leaveGroup}>Leave group</a></li>
            </ul>
          <div className="col s10 offset-s1 m6   s10 component-container">
            <Messages groupId={this.props.match.params.groupId} />
          </div>
        </div>
      </div>
    );
  }
}
Group.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  groupMembers: PropTypes.object,
  match: PropTypes.object,
  leaveGroup: PropTypes.func,
  history: PropTypes.object,
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
    getMessages: (groupId, history) => {
      dispatch(getGroupMessages(groupId, history));
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
