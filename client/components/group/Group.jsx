import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import {
  getGroupMessages,
  getGroupMembers,
  leaveGroup,
  leaveGroupSuccess } from '../../actions/groupActions';
import Messages from '../message/Messages';
import GroupMembers from './GroupMembers';

/**
 * @class Group
 *
 * @extends {React.Component}
 */
export class Group extends React.Component {

  /**
   * @description Creates an instance of Group.
   *
   * @param {object} props -prop object
   *
   * @memberof Group
   */
  constructor(props) {
    super(props);
    this.leaveGroup = this.leaveGroup.bind(this);
  }

  /**
   *
   * @returns {void} -returns nothing
   */
  componentDidMount() {
    const { groupId } = this.props.match.params;
    this.props.getMessages(groupId, this.props.history);
    this.props.getGroupMembers(groupId);
  }

  /**
   *
   * @returns {void}
   */
  componentWillUpdate() {
    $('.dropdown-button').dropdown();
    $('select').material_select();
  }
  /**
   * @description leave group function
   *
   * @returns {void} -returns nothing
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
        const { groupId } = this.props.match.params;
        this.props.leaveGroup(groupId);
      }
    });
  }

  /**
   * @description render function
   *
   * @returns {jsx} -jsx representation of the component
   */
  render() {
    if (this.props.leftGroup) {
      swal('you left group')
      .then(() => {
        this.props.leaveGroupSuccess(false);
        this.props.history.push('/dashboard');
      });
    }
    const { groupId } = this.props.match.params;
    let numberOfGroupMembers;
    let groupName;
    if (this.props.groupMembers.length > 0) {
      groupName = this.props.currentGroup.groupName;
      numberOfGroupMembers = this.props.groupMembers.length;
    }
    return (
      <div>
        <div>
        <div className="col s12 m7 component-container">
          <div className="dashboard-header">
          <Link
          to=""
          id="more-vert"
          className="right dropdown-button"
          data-activates="group-more"
          >
          <i className="material-icons">more_vert</i>
          </Link>
          <span className="right">
          <i className="material-icons">person</i>
          <span className="group-members">
            {numberOfGroupMembers}
          </span>
          </span>
          <span className="bold big">
            {groupName}
          </span>
          </div>
        </div>
            <ul id="group-more" className="dropdown-content">
              <li>
                <Link
                to={`/group/${groupId}/addmembers`}
                >
                Add Members
                </Link>
              </li>
              <li>
                <Link
                to="#"
                id="leave-group"
                onClick={this.leaveGroup}
                >
                Leave group
                </Link>
              </li>
            </ul>
          <div className="col s12 m7 component-container">
            <Messages groupId={this.props.match.params.groupId} />
          </div>
          <GroupMembers />
        </div>
      </div>
    );
  }
}
Group.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  groupMembers: PropTypes.array,
  match: PropTypes.object,
  leaveGroup: PropTypes.func,
  history: PropTypes.object,
  leftGroup: PropTypes.bool,
  leaveGroupSuccess: PropTypes.func.isRequired,
  currentGroup: PropTypes.object,
};
/**
 * @description Maps state to props
 *
 * @param {object} state -application state
 *
 * @returns {object} -returns part of the state
*/
const mapStateToProps = state => (
  {
    leftGroup: state.groupReducer.leftGroup,
    groupMembers: state.groupReducer.members,
    currentGroup: state.groupReducer.currentGroup,
  }
);

/**
 * @description Maps dispatch to props
 *
 * @param {function} dispatch -dispatch function
 *
 * @returns {object} -actions to be dispatched
 */
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
