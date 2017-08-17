import React from 'react';
import Home from './home';

const SignupForm = (props) => {
   return (
      <div>
      <Home>
      <div className="col s8 m6 l6">
        <form method="POST"  action="#" onSubmit={props.handleSubmit.bind(this)}>
          <p> <input type="text" name="username" placeholder="Username" onChange={props.handleChange.bind(this)} /><span></span></p>
          <p> <input type="email" name="email" placeholder="Email" onChange={props.handleChange.bind(this)}/></p>
          <p> <input type="password" name="password" placeholder="password" onChange={props.handleChange.bind(this)} />
            <br /> <span>{}</span>
          </p>
          <p> <input type="text" name="phoneNumber" placeholder="Phone number" onChange={props.handleChange.bind(this)}/></p>
          <p> <input type="submit" value="Signup" className='btn btn-primary'  /></p>
        </form>
      </div>
      </Home> 
      </div>); 
  }

export default SignupForm;
