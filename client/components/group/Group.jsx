import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getGroupMessages, getGroupMembers, leaveGroup, leaveGroupSuccess }
from '../../actions/groupActions';
import AppNav from '../common/AppNav';
import Messages from '../message/Messages';

/**
 * @class Group
 * @extends {React.Component}
 */
class Group extends React.Component {
  /**
   * Creates an instance of Group.
   * @param {object} props
   * @memberof Group
   */
  constructor(props) {
    super(props);
    this.leaveGroup = this.leaveGroup.bind(this);
  }
  /**
   *
   * @returns {void}
   * @memberof Group
   */
  componentWillMount() {
    const groupId = this.props.match.params.groupId;
    this.props.getMessages(groupId, this.props.history);
    this.props.getGroupMembers(groupId);
  }
/**
 *
 * @returns {void}
 * @memberof Group
 */
  componentWillUpdate() {
    $('.dropdown-button').dropdown();
    $('select').material_select();
  }
  /**
   *
   * @returns {void}
   * @memberof Group
   */
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

  /**
   *
   * @returns {object} -react element
   * @memberof Group
   */
  render() {
    if (this.props.leftGroup) {
      swal('you left group')
      .then(() => {
        this.props.leaveGroupSuccess(false);
        this.props.history.push('/dashboard');
      });
    }
    const groupId = this.props.match.params.groupId;
    let numberOfGroupMembers;
    let groupName;
    if (this.props.groupMembers) {
      groupName = this.props.groupMembers.group.groupName;
      numberOfGroupMembers = this.props.groupMembers.users.length;
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
              <li><Link to="#" onClick={this.leaveGroup}>Leave group</Link></li>
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
  leftGroup: PropTypes.bool,
  leaveGroupSuccess: PropTypes.func.isRequired,
};
const mapStateToProps = state => (
  {
    leftGroup: state.groupReducer.leftGroup,
    groupMembers: state.groupReducer.members,
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
