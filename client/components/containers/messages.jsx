import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendUserMessage, getGroupMessages, sendMessageSuccess } from '../../actions/groupAction';

class Messages extends React.Component {
  constructor() {
    super();
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }
  handleMessageChange(event) {
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
        <div className="message-form row" >
            <form method="Post" className="" onSubmit={this.postMessage}>
                <div className="">
                  <textarea placeholder="Enter message here" name="messageBody" required="required"
                    className="message-input-field col s6" onChange={this.handleMessageChange}
                  />
                </div>  
                <div className="message-priority-field col s4" >
                  <select name="messagePriority" className="browser-default" onChange={this.handleMessageChange}>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="col s2">
                  <button className=""><i className="material-icons">send</i> </button>
                  {/* <input type="submit" className="btn light-blue" value="Post" /> */}
                </div>
            </form>
            </div>
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
