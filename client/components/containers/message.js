import React from 'react';
import { connect } from 'react-redux';
import { sendUserMessage } from '../../actions/messageAction';

class Message extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
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
      <div />

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
