import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroupMembers } from '../../actions/groupActions';

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
    const { groupId } = this.props;
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
      const members = this.props.groupMembers.groupMembers;
      groupMembersList = (<ul>
        {members.map(member => (
          <li key={member.id} className="group-members-list">
          <span to="#" className="big"> {member.fullName} </span>
          <div className="username-avatar">
            {member.fullName[0]}
          </div>
          </li>
      ))
      }
      </ul>);
    }
    return (
      <div className="hide-on-med-and-down component-container">
        <h2 className="center big"> Group Members </h2>
        <div className="divider" />
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
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);

