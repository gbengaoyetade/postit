import React from 'react';
import { connect } from 'react-redux';
import { sendUserMessage } from '../../actions/messageAction';
import MessageForm from '../presentational/messageForm';

class Message extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.props.message[name] = value;
    console.log(this.props);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.postMessage(this.props.message, 1);
  }
  render() {
    return (
      <div>
        <MessageForm 
          handleSubmit={this.handleSubmit.bind(this)}
          handleChange={this.handleChange.bind(this)}
          priority={this.props.message.priority}
        />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    message: state.postMessageReducer,
  }
);

const mapDispatchToProps = dispatch => (
  {
    postMessage: (message, groupId) => {
      dispatch(sendUserMessage(message, groupId));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Message);
