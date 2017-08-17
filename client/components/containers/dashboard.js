import React from 'react';
import { withRouter } from 'react-router-dom';
import UserNav from '../presentational/usernav';
import Home from '../presentational/home';

class Dashboard extends React.Component {
  componentWillMount (){
    if(!window.sessionStorage.postitToken){
      // this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
      <UserNav />
      <Home>
        <p>Welcome to the dashboard</p>
      </Home>
      </div>
      );
  }
}
export default withRouter(Dashboard);
