import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendUserMessage, getGroupMessages, sendMessageSuccess }
from '../../actions/groupActions';
import MessageForm from './MessageForm';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      messageBody: '',
      messagePriority: 'Normal',
    };
  }
  componentWillReceiveProps() {
    document.getElementById('scrollTo').scrollIntoView();
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const groupId = this.props.groupId;
    this.props.sendUserMessage(groupId, this.state);
    this.setState({ messageBody: '' });
  }
  render() {
    let groupMessages = (
      <p className="flow-text center red-text">
    This group currently has no messages</p>);
    if (this.props.sendMessageSuccess) {
      this.props.getMessages(this.props.groupId);
      this.props.setSendMessageSuccess(false);
    }
    if (this.props.messages.messages &&
      this.props.messages.messages.length > 0) {
      groupMessages = (
        <ul>
          {
            this.props.messages.messages.map(message => (
              <div className="single-message" key={message.id}>
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
        <div className="group-messages" id="single">
          {groupMessages}
          <p>&nbsp; </p>
          <p>&nbsp; </p>
          <span id="scrollTo">&nbsp; </span>
        </div>
        <MessageForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        messageBody={this.state.messageBody}
        />
      </div>
    );
  }
}
Messages.propTypes = {
  groupId: PropTypes.number,
  sendUserMessage: PropTypes.func.isRequired,
  sendMessageSuccess: PropTypes.bool,
  getMessages: PropTypes.func,
  messages: PropTypes.object,
};
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
