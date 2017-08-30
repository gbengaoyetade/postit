import React from 'react';
import Container from '../presentational/container';

class RecoverPassword extends React.Component{
  render(){
   return (
    <div>
    <Container>
      <p className="center"> 
        Enter email address to recover password
      </p>
      <input type="text" name="email" />
    </Container>
    </div>
    );
  }
}
export default RecoverPassword;
