import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from './userSideNav.jsx';

const Group = props => (
  <div>
    <SideNav />
    <div className="col s10 offset-s1 m5 offset-m1 s10 component-container">
      <h5 className="center"> Messages </h5>
      <form method="Post" className="form-field" onSubmit={props.postMessage.bind(this)}>
        <textarea name="messageBody" onChange={props.handleMessageChange.bind(this)}></textarea>
        <div className="input-field">
          <p>Choose message priority </p>
        </div>
        <input type="radio" id="normal" name="messagePriority" value="Normal" onChange={props.handleMessageChange} />
        <label htmlFor="normal"> Normal </label>
        <input type="radio" id="urgent" name="messagePriority" value="Urgent" onChange={props.handleMessageChange} />
        <label htmlFor="urgent"> Urgent </label>
        <input type="radio" id="critical" name="messagePriority" value="Critical" onChange={props.handleMessageChange} />
        <label htmlFor="critical"> Critical</label>
        <div className="input-field">
          <input type="submit" className="btn light-blue"value="Post" />
        </div>
      </form>
      {props.groupMessages}
    </div>
  </div>
);
export default Group;
