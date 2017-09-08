import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './visitornav';
import Container from './container';

const Welcome = (props) => {
  if (window.sessionStorage.postitToken) {
    props.history.push('/dashboard');
    }
  return (
    <div>
      <Nav />
      <Container>
        <div className="component-container s8 offset-s1 m6 z-depth-2">
          <h1 className="center grey-text"> Messaging...</h1>
          <p className="center grey-text">always better when done groups.</p>
          <Link to="signup" className="center btn light-blue darken-4 col s8 offset-s2 m4 offset-m4"> 
          Get Started </Link>
          <p className="clearfix"> </p>
        </div>
      </Container>
    </div>
  );
}
export default Welcome;
