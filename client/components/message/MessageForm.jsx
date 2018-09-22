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
  <div>
    <div className="message-form col s12 ">
      <form onSubmit={props.handleSubmit}>
        <div className="">
          <textarea
            placeholder="Enter message here"
            name="messageBody"
            required="required"
            className="message-input-field col s6 m4"
            onChange={props.handleChange}
            value={props.messageBody}
          />
        </div>
        <div className="col s5 m3">
          <div className="message-options">
            <select
              name="messagePriority"
              className="browser-default message-priority-field"
              onChange={props.handleChange}
            >
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
              <option value="Critical">Critical</option>
            </select>
            <button className="message-button">
              <i className="material-icons">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
MessageForm.propTypes = {
  handleChange: PropType.func,
  handleSubmit: PropType.func,
  messageBody: PropType.string
};
export default MessageForm;
