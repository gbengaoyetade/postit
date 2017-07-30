import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render () {
    return (
      <div>
      <p> Hello welcome to React!</p>;
      </div>
      );
  }
}
render(<div><h1>welcome</h1></div>, document.getElementById('app'));
