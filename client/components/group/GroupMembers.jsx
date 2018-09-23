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
   * @description render function
   *
   * @returns {jsx} -jsx representation of the component
   */
  render() {
    let groupMembersList;
    if (this.props.groupMembers.length > 0) {
      const members = this.props.groupMembers;
      groupMembersList = (
        <ul>
          {members.map(member => (
            <li key={member.id} className="group-members-list">
              <Link to="#" className="big">
                {' '}
                {member.fullName}{' '}
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="hide-on-small-and-down group-members-div component-container">
        <div className="center">
          <span className="center big"> Group Members </span>
        </div>
        <div className="divider" />
        {groupMembersList}
      </div>
    );
  }
}
GroupMembers.propTypes = {
  getGroupMembers: PropTypes.func.isRequired,
  groupId: PropTypes.number,
  groupMembers: PropTypes.array
};
/**
 * @description Maps state to props
 *
 * @param {object} state -application state
 *
 * @returns {object} -returns part of the state
 */
const mapStateToProps = state => ({
  groupMembers: state.groupReducer.members
});

/**
 * @description Maps dispatch to props
 *
 * @param {function} dispatch -dispatch function
 *
 * @returns {object} -actions to be dispatched
 */
const mapDispatchToProps = dispatch => ({
  getGroupMembers: (groupId) => {
    dispatch(getGroupMembers(groupId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupMembers);
