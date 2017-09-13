import React from 'react';
import { connect } from 'react-redux';
import GroupPage from '../presentational/group';
import { getGroupMessages, getGroupMembers } from '../../actions/groupAction';
import Message from './message';

class Group extends React.Component {

  componentDidMount() {
    const groupId = this.props.match.params.groupId
    this.props.getMessages(groupId);
    this.props.getGroupMembers(groupId);
    console.log(this.props.messages);
    console.log('props', this.props);
  }
  render() {
    let groupMessages;
    let groupMembers;
    if (this.props.getGroupMembersSuccess) {
      console.log(this.props.groupMembers.members);
      const members = this.props.groupMembers.members;
      groupMembers = (
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.username}</li>
        ))}
      </ul>
      );
    }
    if (this.props.messageSuccess) {
      const messages = this.props.messages.messages;
      groupMessages = (
        <ul>
          {messages.map(message => (
            <li key={message.id}>{message.messageBody}</li>
          ))}
        </ul>
      );
    }
    return (
      <div>
        <GroupPage groupMessages={groupMessages} groupMembers={groupMembers} />
        <Message />
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    group: state.groupReducer,
    messages: state.getUserGroupMessages,
    messageSuccess: state.getUserGroupSuccess,
    groupMembers: state.getGroupMembers,
    getGroupMembersSuccess: state.getGroupMembersSuccess,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (groupId) => {
      dispatch(getGroupMessages(groupId));
    },
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
