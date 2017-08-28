import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './visitornav';
import Container from './container';

const Welcome = (props) => {
  if (window.sessionStorage.postitToken) {
    this.props.history.push('/dashboard');
    }
  return (
    <div>
      <Nav />
      <Container>
        <div >
          <p>Messaging is always better when done together.</p>
          <p>Message in groups </p>
          <Link to="signup" className="right btn light-blue darken-4"> Get Started </Link>
        </div>
      </Container>
    </div>
  );
}
export default Welcome;
