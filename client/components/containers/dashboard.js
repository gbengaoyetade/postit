import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CreateGroup from './createGroup';
import { getGroups } from '../../actions/createGroupAction';

class Dashboard extends React.Component {
  componentWillMount() {

  }
  componentDidMount() {
    console.log(this.props);
    this.props.getGroups();
  }
  render() {
    let groups;
    let userGroups;
    if (this.props.userGroupSuccess) {
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
        <CreateGroup />
        <div className="row">
          <div className="col m2 component-container hide-on-med-and-down">
          <ul className="">
              <li>
              <Link to="#createGroupModal" className="hide-on-med-and-up modal-trigger">
                <i className="material-icons">group_add</i> New Group
              </Link>
              </li>
              <li>
              <Link to="#createGroupModal" className="modal-trigger">
                <i className="material-icons">group</i>New Group
              </Link>
              </li>
              <li><div className="divider"></div></li>
              <li><Link className="waves-effect" to="#">
                <i className="material-icons">account_circle</i> Profile
              </Link></li>
            </ul>
          </div>
          <div className="col m5 s10 offset-s1  offset-m1  component-container">
          </div>
          <div className="col m3 component-container  offset-m1 hide-on-med-and-down">
            <p className="center header">My groups</p>
            {userGroups}
          </div>
        </div>
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