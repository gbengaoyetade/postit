import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendUserMessage, getGroupMessages, sendMessageSuccess }
from '../../actions/groupAction';
import MessageForm from './MessageForm';

class Messages extends React.Component {
  constructor() {
    super();
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.props.message[name] = value;
  }
  postMessage(event) {
    event.preventDefault();
    const groupId = this.props.groupId;
    this.props.sendUserMessage(groupId, this.props.message);
  }
  render() {
    console.log(this.props.messages.messages);
    let groupMessages;
    if (this.props.sendMessageSuccess) {
      this.props.getMessages(this.props.groupId);
      this.props.setSendMessageSuccess(false);
    }
    if (this.props.messages.messages) {
      groupMessages = (
      <ul>
        {
          this.props.messages.messages.map( message => (
            <div id="single-message" key={message.id}>
              <p><a href="">{message.user.username}</a></p>
            <p className="right"><small>{message.messagePriority}</small></p>
              <p>{message.messageBody}</p>
              {/* <hr /> */}
              <div className="clearfix" />
            </div>
        ))
      }
      </ul>
    );
    }
    return (
      <div>
        <h5 className="center"> Messages </h5>
        <div className="group-messages">
          {groupMessages}
        </div>
        <MessageForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    message: state.postMessageReducer,
    messages: state.getUserGroupMessages,
    sendMessageSuccess: state.sendMessageSuccess,
  }
);

const mapDispatchToProps = dispatch => (
  {
    sendUserMessage: (message, groupId) => {
      dispatch(sendUserMessage(message, groupId));
    },
    setSendMessageSuccess: (bool) => {
      dispatch(sendMessageSuccess(bool));
    },
    getMessages: (groupId) => {
      dispatch(getGroupMessages(groupId));
    },
  }
);
Messages.propTypes = {
  setSendMessageSuccess: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
