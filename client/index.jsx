import React from 'react';
import { render } from 'react-dom';
import Nav from './components/nav.jsx';
import Signup from './components/signup.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
      <p> Hello welcome to React! {this.props.value}</p>
      </div>
      );
  }
}

render(<div> <Nav /> <App value="Gbenga" /> <Signup /> </div>, document.getElementById('app'));
