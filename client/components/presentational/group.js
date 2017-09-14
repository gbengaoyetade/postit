import React from 'react';
import { Link } from 'react-router-dom';
import SideNav from './sideNav.jsx';

const Group = props => (
  <div className="row">
    <SideNav />
    <div className="col m5 offset-m1 s10 component-container">
      <h5 className="center"> Messages </h5>
      <form method="Post" className="form-field" onSubmit={props.postMessage.bind(this)}>
        <textarea name="messageBody" onChange={props.handleMessageChange.bind(this)}></textarea>
        <div className="input-field">
          <p>Choose message priority </p>
        </div>
        <input type="radio" id="normal" name="messagePriority" value="Normal" checked onChange={props.handleMessageChange.bind(this)} />
        <label htmlFor="normal"> Normal </label>
        <input type="radio" id="urgent" name="messagePriority" value="Urgent" onChange={props.handleMessageChange.bind(this)} />
        <label htmlFor="urgent"> Urgent </label>
        <input type="radio" id="critical" name="messagePriority" value="Critical" onChange={props.handleMessageChange.bind(this)} />
        <label htmlFor="critical"> Critical</label>
        <div className="input-field">
          <input type="submit" className="btn light-blue"value="Post" />
        </div>
      </form>
      {props.groupMessages}
    </div>
    <div className="col m2 component-container hide-on-med-and-down">
      <p> &nbsp; </p>
      <div className="row">
        <Link className="btn blue" to={`/group/${props.groupId}/addmembers`}> Add Members </Link>
        <a className="btn red" href="#" onClick={props.leaveGroup}> Leave Group </a>
      </div>
      
      <p className="center"> Group Members </p>
      {props.groupMembers}
    </div>
  </div>
);
export default Group;
