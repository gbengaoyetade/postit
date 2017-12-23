import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './common/Nav';

/**
 * @description Home component
 *
 * @returns { object } -react element
 */
const Home = () => {
  const rightLinkObject = (
    <div>
      <ul className="hide-on-med-and-down">
        <li><Link className="" to="/login" > Login </Link> </li>
        <li><Link className="" to="/signup" > Signup </Link> </li>
      </ul>
        <div className="hide-on-med-and-up">
        <ul id='authDropdown' className='dropdown-content'>
        <li><a href="/login" >Login</a></li>
        <li><a href="/Signup">Signup</a></li>
        </ul>
        <Link
        className='dropdown-button'
        to='#'
        data-activates='authDropdown'
        >
        <i className="material-icons">menu</i>
        </Link>
        </div>
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
};
export default Home;
