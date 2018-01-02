import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { sendUserMessage, getGroupMessages, sendMessageSuccess }
from '../../actions/groupActions';
import MessageForm from './MessageForm';

/**
 * @class Messages
 *
 * @extends { React.Component }
 */
class Messages extends React.Component {

  /**
   * @description Creates an instance of Messages.
   *
   * @param { object } props -prop object
   *
   * @memberof Messages
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      messageBody: '',
      messagePriority: 'Normal',
    };
  }

  /**
   *
   * @returns { void }
   */
  componentWillReceiveProps() {
    document.getElementById('scrollTo').scrollIntoView();
  }
  /**
   * @description handles onChnage event
   *
   * @param { objet } event -event object
   *
   * @returns { void }
   */
  handleChange(event) {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }
  /**
   * @description handles form submission
   *
   * @param { object } event -event object
   *
   * @returns { void } -returns nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    const { groupId } = this.props;
    this.props.sendUserMessage(groupId, this.state);
    this.setState({ messageBody: '' });
  }

  /**
   * @description render function
   *
   * @returns { object } -returns react element
   */
  render() {
    let groupMessages = '';
    if (this.props.messages) {
      if (this.props.messages.length > 0) {
        groupMessages = (
          <ul>
            {
              this.props.messages.map(message => (
                <div className="single-message col s12" key={message.id}>
                  <p>
                    <Link to="#">
                    {message.user.username}
                    </Link>
                    <small className="right">
                  {moment(message.createdAt).fromNow()}
                  </small>
                  </p>
                  <p className="message-priority">
                    <span>Message priority: </span>
                    <small> {message.messagePriority}</small>
                  </p>
                  <p className="message-body" >
                    {message.messageBody}
                  </p>
                  <div className="clearfix" />
                </div>
            ))
          }
          </ul>
        );
      } else {
        groupMessages = (
        <p className="flow-text center red-text">
          Group currently has no messages
          </p>);
      }
    } else {
      groupMessages = (
        <div className="preloader-wrapper big active center">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
  );
    }
    return (
      <div>
        <div className="group-messages" >
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
    messages: state.messageReducer.messages,
    sendMessageSuccess: state.messageReducer.messageSent,
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
