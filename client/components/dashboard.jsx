import React from 'react';

class Dashboard extends React.Component {
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <p>Welcome to the dashboard</p>
      </div>
      );
  }
}
export default Dashboard;
