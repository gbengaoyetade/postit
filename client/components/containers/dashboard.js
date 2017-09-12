import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import UserNav from '../presentational/usernav';
import Home from '../presentational/container';
import { getGroups } from '../../actions/createGroupAction';

class Dashboard extends React.Component {
  componentWillMount () {

  }
  componentDidMount () {
    if (!window.sessionStorage.postitToken) {
       this.props.history.push('/login');
    }
    console.log(this.props);
    this.props.getGroups();
  }  
  render() {
    let groups;
    let userGroups;
    if(this.props.userGroupSuccess){
      groups = this.props.groups.groups;
      console.log(this.props.groups.groups);
      userGroups = <ul>
        {groups.map((group) =>(
          <li key={group.id}><Link to={'/group/' + group.id}>  { group.groupName } </Link> </li>
          ))}
        </ul>
    }
    return (
      <div>
      <UserNav />
      <Home>
        <p className='align-center'>Your groups</p>
        {userGroups}
      </Home>
      </div>
      );
  }
}


const mapStateToProps = (state) => {
  return {
    groups: state.userGroupReducer,
    userGroupSuccess: state.getUserGroupSuccess,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => {
      dispatch(getGroups());
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));