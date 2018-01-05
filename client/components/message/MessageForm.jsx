import React from 'react';
import PropType from 'prop-types';


/**
 * @description MessageForm component
 *
 * @param {object} props -prop object
 *
 * @returns {jsx} -jsx representation of the component
 */
const MessageForm = props => (
  (
    <div>
        <div className="message-form col s12 " >
        <form method="Post" onSubmit={props.handleSubmit}>
            <div className="">
              <textarea
              placeholder="Enter message here"
              name="messageBody" required="required"
              className="message-input-field col s7 m7"
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
