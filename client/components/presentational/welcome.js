import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './visitornav';
import Container from './container';

const Welcome = (props) => {
  return (
    <div>
      <Nav />
      <Container>
        <div >
          <p>It's always better together</p>
          <p>Message in groups </p>
          <Link to="signup" className="right btn light-blue darken-4"> Get Started </Link>
        </div>
      </Container>
    </div>
  );
}
export default Welcome;
