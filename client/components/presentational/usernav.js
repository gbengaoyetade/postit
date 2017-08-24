import React from 'react';
import { Link } from 'react-router-dom';
import GroupForm from '../containers/createGroup';

const UserNav = (props) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper  light-blue darken-4 ">
          <a href="#!" className="left brand-logo hide-on-med-and-down">Postit</a>
          <a href="#" className="center brand-logo hide-on-med-and-up">Postit</a>
          <div className="hide-on-med-and-up left" >
            <ul id="slide-out" className="side-nav">
              <li><div className="user-view">
                <div className="background">
                  <img src="images/office.jpg" />
                </div>
                <a href="#!user"><img className="circle" src="images/yuna.jpg" /></a>
                <a href="#!name"><span className="white-text name">John Doe</span></a>
                <a href="#!email"><span className="white-text email">jdandturk@gmail.com</span></a>
              </div></li>
              <li>
              <a href="#createGroupModal" className="hide-on-med-and-up modal-trigger">Create Group</a></li>
              <li><div className="divider"></div></li>
              <li><a className="subheader">Subheader</a></li>
              <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
            <a href="#" data-activates="slide-out" className="button-collapse left">
              <i className="material-icons">menu</i>
            </a>
          </div>
          
          <ul className="right hide-on-med-and-down">
            <li><Link to="#" ><i className="material-icons">notifications</i></Link></li>
            <li><Link to="/user" ><i className="material-icons">account_circle</i></Link></li>
          </ul>
          <form className="right">
          <div className="input-field">
            <input id="search" type="search" required />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </form>
        </div>
        <GroupForm handleSubmit={props.handleSubmit} />
      </nav>
    </div>
    );
}
export default UserNav;
