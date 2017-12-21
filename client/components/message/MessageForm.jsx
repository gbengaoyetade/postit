import React from 'react';
import PropType from 'prop-types';
/**
 * @param {any} props
 * @returns {object} -returns react element
 */
const MessageForm = props => (
  (
    <div>
        <div className="message-form" >
        <form method="Post" onSubmit={props.handleSubmit}>
            <div className="">
              <textarea
              placeholder="Enter message here"
              name="messageBody" required="required"
              className="message-input-field col s7"
              onChange={props.handleChange}
              value={props.messageBody} />
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
              <button className="message-button">
                <i className="material-icons">send</i>
              </button>
            </div>
        </form>
        </div>
    </div>
  )
);
MessageForm.propTypes = {
  handleChange: PropType.func,
  handleSubmit: PropType.func,
  messageBody: PropType.string,
};
export default MessageForm;
