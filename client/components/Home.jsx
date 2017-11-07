import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './navigation/Visitornav.jsx';
import Container from './general/Container.jsx';

const Home = (props) => {
  if (window.sessionStorage.postitToken) {
    props.history.push('/dashboard');
  }
  return (
    <div className="grey">
      <Nav />
      <Container>
        <div className="s8 offset-s1 m6 ">
          <h1 className=""> Built for</h1>
          <h2 className="">Group messaging</h2>
          <p>
            Postit allows you create groups and send
            prioritized messages to these groups.</p>
          <Link to="signup"
          className=
          "center btn light-blue darken-4 col s8 offset-s2 m4 offset-m4">
          Get Started </Link>
          <p className="clearfix" />
        </div>
      </Container>
    </div>
  );
};
export default Home;
