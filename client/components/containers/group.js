import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GroupPage from '../presentational/group';
import { getGroupMessages, getGroupMembers, leaveGroup } from '../../actions/groupAction';
import { sendUserMessage } from '../../actions/messageAction';
import Message from './message';
import GroupMembers from './groupMembers.jsx';

class Group extends React.Component {
  constructor() {
    super();
    this.postMessage = this.postMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }
  componentDidMount() {
    const groupId = this.props.match.params.groupId;
    this.props.getMessages(groupId);
    this.props.getGroupMembers(groupId);
  }
  handleMessageChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.props.message[name] = value;
    console.log(this.props.message);
  }
  postMessage(event) {
    event.preventDefault();
    console.log('postMessage', this.props.message);
    const groupId = this.props.match.params.groupId;
    console.log(groupId);
    this.props.sendUserMessage(groupId, this.props.message);
  }
  render() {
    let groupMessages;
    let groupMembers;
    if (this.props.groupMembers.members) {
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
    if (this.props.messages.messages) {
      console.log('in messages', this.props.messages.messages);
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
      <div className="row">
        <GroupPage
          groupMessages={groupMessages}
          groupMembers={groupMembers}
          postMessage={this.postMessage}
          handleMessageChange={this.handleMessageChange}
          groupId={this.props.match.params.groupId}
        />
        <GroupMembers groupId={this.props.match.params.groupId} history={this.props.history} />
      </div>
    );
  }
}
Group.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
};
const mapStateToProps = state => (
  {
    group: state.groupReducer,
    messages: state.getUserGroupMessages,
    groupMembers: state.getGroupMembers,
    message: state.postMessageReducer,
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
    leaveGroup: (groupId) => {
      dispatch(leaveGroup(groupId));
    },
    sendUserMessage: (groupId, message) => {
      dispatch(sendUserMessage(groupId, message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
