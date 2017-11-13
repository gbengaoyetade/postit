import React from 'react';
import PropType from 'prop-types';

const MessageForm = props => (
  (
    <div>
        <div className="message-form" >
        <form method="Post" className="" onSubmit={props.handleSubmit}>
            <div className="">
              <textarea
              placeholder="Enter message here"
              name="messageBody" required="required"
              className="message-input-field col s7"
              onChange={props.handleChange}
              />
            </div>
            <div className="message-priority-field col s4" >
              <select
              name="messagePriority"
              className="browser-default"
              onChange={props.handleChange}>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="col s1">
              <button className="messageButton">
                <i className="material-icons">send</i>
              </button>
            </div>
        </form>
        </div>
    </div>
  )
);
MessageForm.propTypes = {
  handleChange: PropType.func.isRequired,
  handleSubmit: PropType.func.isRequired,
};
export default MessageForm;
