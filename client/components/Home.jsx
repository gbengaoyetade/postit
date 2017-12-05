import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './common/Nav';

/**
 *
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
  /**
   *
   * @returns {void}
   * @memberof Home
   */
  componentWillUpdate() {
    $('.button-collapse').sideNav();
  }
  /**
   *
   *
   * @returns {object} -jsx
   * @memberof Home
   */
  render() {
    const rightLinkObject = (
      <div>
        <ul className="hide-on-med-and-down">
          <li><Link className="" to="/login" > Login </Link> </li>
          <li><Link className="" to="/signup" > Signup </Link> </li>
        </ul>
          <ul id="slide-out" className="side-nav">
            <p />
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        <Link
          to="#"
          data-activates="slide-out"
          className="right button-collapse">
          <i className="material-icons">menu</i>
        </Link>
      </div>
    );
    return (
      <div >
        <Nav
        rightLink={rightLinkObject}
        />
        <div className="centralized-div row">
          <div className="col m4 offset-m3 s10 offset-s1" >
          <h1 className="bold-font"> Built for</h1>
            <h2 className="bold-font">Group messaging</h2>
            <p className="postit-text">
              Postit allows you communicate within the scope of a group.
              You get to create groups, join existing
              ones and send prioritized
              messages to group members.
              </p>
            <Link to="signup" className= "center btn light-blue darken-4">
              Get Started
            </Link>
            <p className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
