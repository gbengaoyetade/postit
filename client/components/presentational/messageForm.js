import React from 'react';
import { Link } from 'react-router-dom';

const MessageForm = (props) => {
  return (
    <div>
      <div id="createMessageModal" className="modal col s10 ">
        <div className="modal-content">
          <form method="POST"  className="" onSubmit={props.handleSubmit.bind(this)}>
          <div className="input-field">
            <textarea name="message" onChange={props.handleChange.bind(this)}>
            </textarea>
            <label htmlFor="message">Message</label>
          </div> 
            <select onChange={props.handleChange.bind(this)}>
              <option value="normal"> Normal </option>
              <option value="urgent"> Urgent</option>
              <option value="critical"> Critical</option>
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