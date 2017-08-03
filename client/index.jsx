import React from 'react';
import { render } from 'react-dom';
import Nav from './components/nav.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
      <p> Hello welcome to React! {this.props.value}</p>
      </div>
      );
  }
}

render(<div> <Nav /> <App value="Gbenga" /> </div>, document.getElementById('app'));
