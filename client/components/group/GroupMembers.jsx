import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroupMembers, leaveGroup } from '../../actions/groupActions';

/**
 *
 * @class GroupMembers
 *
 * @extends {React.Component}
 */
class GroupMembers extends React.Component {

/**
 *
 * @returns { void }
 */
  componentDidMount() {
    const groupId = this.props.groupId;
    this.props.getGroupMembers(groupId);
  }

  /**
   * @description render function
   * 
   * @returns { object } -returns react element
   */
  render() {
    let groupMembersList;
    if (this.props.groupMembers) {
      const members = this.props.groupMembers;
      groupMembersList = (<ul className="collection">
        {members.map(member => (
          <li key={member.id} className="collection-item center">
            <Link to="#"> {member.fullName} </Link></li>
      ))
      }
      </ul>);
    }
    return (
      <div className="col m3 component-container hide-on-med-and-down">
        <p> &nbsp; </p>
        <div className="row">
          <Link className="btn blue col m6"
          to={`/group/${this.props.groupId}/addmembers`}>Add Member</Link>
          <a href=""className="btn red modal-trigger"
          data-target="modal1" >leaveGroup</a>
        </div>
        <p className="center"> Group Members </p>
        {groupMembersList}
      </div>
    );
  }
  }
GroupMembers.propTypes = {
  leaveGroup: PropTypes.func.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  groupId: PropTypes.number,
  groupMembers: PropTypes.object,
};
const mapStateToProps = state => (
  {
    groupMembers: state.groupReducer.members,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
    leaveGroup: (groupId, history) => {
      dispatch(leaveGroup(groupId, history));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);

