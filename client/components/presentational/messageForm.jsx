import React from 'react';
// import { Link } from 'react-router-dom';

const MessageForm = (props) => {
  return (
    <div>
      <div id="createMessageModal" className="modal col s10 ">
        <div className="modal-content">
          <form  className="" onSubmit={props.handleSubmit.bind(this)}>
          <div className="input-field">
            <textarea name="messageBody" onChange={props.handleChange.bind(this)}>
            </textarea>
            <label htmlFor="message">Message</label>
          </div> 
            <select className="" value={props.priority}name="messagePriority" onChange={props.handleChange.bind(this)}>
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
  )
};
export default MessageForm;
