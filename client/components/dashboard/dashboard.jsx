import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getGroups } from '../../actions/groupAction';
import SideNav from '../navigation/userSideNav';

class Dashboard extends React.Component {
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
      <div className="row">
        <SideNav currentUrl={this.props.match.path} />
        <div className="col m6 s12 component-container">
          <p className="center header">Group messages</p>
        </div>
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
