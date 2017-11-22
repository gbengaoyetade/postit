import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './common/Nav';

/**
 * @returns {object} -returns react element
 */
const Home = () => {
  const rightLinkObject = (
  <ul className="hide-on-med-and-down">
    <li><Link className="" to="/login" > Login </Link> </li>
    <li><Link className="" to="/signup" > Signup </Link> </li>
    <li><a target="_blank" href="/doc" > API doc </a> </li>
  </ul>);
  return (
    <div >
      <Nav
      rightLink={rightLinkObject}
      />
      <div className="centralized-div row">
        <div className="col m4 offset-m3 s8 offset-s3" >
        <h1 className=""> Built for</h1>
          <h2 className="">Group messaging</h2>
          <p>
            Postit allows you communicate within the scope of a group.
            You get to create groups, join existing ones and send prioritized
            messages to group members.
            </p>
          <Link
            to="signup"
            className=
            "center btn grey darken-4">
            Get Started
          </Link>
          <p className="clearfix" />
        </div>
      </div>
    </div>
  );
};
export default Home;
