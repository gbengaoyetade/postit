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
      <div>
      <div id="createMessageModal" className="modal col s10 ">
        <div className="modal-content">
          <form onSubmit={this.props.handleSubmit}>
          <div className="input-field">
            <textarea name="messageBody" onChange={this.props.handleChange}>
            </textarea>
            <label htmlFor="message">Message</label>
          </div> 
            <select className="browser-default" value={this.props.priority}name="messagePriority" onChange={this.props.handleChange}>
              <option value="" disabled >Choose message priority </option>
              <option value="Normal"> Normal </option>
              <option value="Urgent"> Urgent</option>
              <option value="Critical"> Critical</option>
            </select>
            <label htmlFor="priority">Message priority</label>
          <p className="row"> <input type="submit" value="POST" className="btn light-blue darken-4 col s8 offset-s2" />
          </p>
      </form>
        </div>
      </div>
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
