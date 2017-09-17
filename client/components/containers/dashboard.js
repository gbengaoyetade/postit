import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getGroups } from '../../actions/groupAction';
import UserDashboard from '../presentational/userDashboard.jsx';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getGroups();
    console.log(this.props);
  }
  render() {
    let groups;
    let userGroups;
    if (this.props.groups.groups) {
      groups = this.props.groups.groups;
      userGroups = (
        <ul className="collection">
          {groups.map(group => (
            <li key={group.id} className="collection-item"><Link to={`/group/${group.id}`}> {group.groupName} </Link> </li>
            ))}
        </ul>);
    }
    return (
      <div>
        <UserDashboard userGroups={userGroups} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  getGroups: PropTypes.func.isRequired,
  // user: PropTypes.shape().isRequired,
  // groups: PropTypes.shape().isRequired,
};

const mapStateToProps = state => (
  {
    groups: state.userGroupReducer,
    userGroupSuccess: state.getUserGroupSuccess,
    user: state.userAuth,
    error: state.loginError,
  }
);
const mapDispatchToProps = dispatch => (
  {
    getGroups: () => {
      dispatch(getGroups());
    },
  }
);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
