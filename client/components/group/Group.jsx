import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getGroupMessages, getGroupMembers, leaveGroup, leaveGroupSuccess }
from '../../actions/groupActions';
import AppNav from '../navigation/AppNav';
import Messages from '../message/Messages';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.leaveGroup = this.leaveGroup.bind(this);
  }
  componentWillMount() {
    const groupId = this.props.match.params.groupId;
    this.props.getMessages(groupId, this.props.history);
    this.props.getGroupMembers(groupId);
  }
  componentWillUpdate() {
    $('.dropdown-button').dropdown();
    $('select').material_select();
  }
  leaveGroup() {
    swal({
      title: 'Leave group warning',
      text: 'Are you sure you want to leave group?',
      icon: 'warning',
      buttons: ['Cancel', 'Yes'],
      dangerMode: true,
    })
    .then((leave) => {
      if (leave) {
        const groupId = this.props.match.params.groupId;
        this.props.leaveGroup(groupId);
      }
    });
  }
  render() {
    if (this.props.leftGroup.leftGroup) {
      swal('you left group')
      .then(() => {
        this.props.leaveGroupSuccess(false);
        this.props.history.push('/dashboard');
      });
    }
    const groupId = this.props.match.params.groupId;
    let numberOfGroupMembers;
    let groupName;
    if (this.props.groupMembers.members) {
      groupName = this.props.groupMembers.members.group.groupName;
      numberOfGroupMembers = this.props.groupMembers.members.users.length;
    }
    return (
      <div className="row">
        <div>
          <AppNav
            groupId={groupId}
            useHeader='true'
            numberOfGroupMembers={numberOfGroupMembers}
            groupName={groupName}
          />
            <ul id="group-more" className="dropdown-content">
              <li>
                <Link to={`/group/${groupId}/addmembers`}>
                Add Members</Link>
              </li>
              <li><a href="#" onClick={this.leaveGroup}>Leave group</a></li>
            </ul>
          <div className="col s12 m6 component-container">
            <Messages groupId={this.props.match.params.groupId} />
          </div>
        </div>
      </div>
    );
  }
}
Group.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  groupMembers: PropTypes.object,
  match: PropTypes.object,
  leaveGroup: PropTypes.func,
  history: PropTypes.object,
  leftGroup: PropTypes.object,
  leaveGroupSuccess: PropTypes.func.isRequired,
};
const mapStateToProps = state => (
  {
    leftGroup: state.userGroupReducer,
    messages: state.getUserGroupMessages,
    groupMembers: state.getGroupMembers,
    message: state.postMessageReducer,
    messageSuccess: state.sendMessageSuccess,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getMessages: (groupId, history) => {
      dispatch(getGroupMessages(groupId, history));
    },
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
    leaveGroup: (groupId) => {
      dispatch(leaveGroup(groupId));
    },
    leaveGroupSuccess: (leftGroup) => {
      dispatch(leaveGroupSuccess(leftGroup));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Group);
