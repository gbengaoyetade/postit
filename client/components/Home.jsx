import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './navigation/Visitornav.jsx';

const Home = () => (
  (
    <div >
      <Nav />
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
  )
);
export default Home;
