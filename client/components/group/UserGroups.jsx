import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getGroups,
  getGroupMembers,
  getGroupMessages
} from '../../actions/groupActions';

/**
 *
 * @class UserGroups
 *
 * @extends {React.Component}
 */
export class UserGroups extends React.Component {
  /**
   * @description Creates an instance of UserGroups.
   *
   * @param {object} props -prop object
   *
   * @returns {void} -return nothing
   */
  constructor(props) {
    super(props);
    this.getGroupData = this.getGroupData.bind(this);
  }

  /**
   *
   *  @returns {void} -returns nothing
   */
  componentDidMount() {
    const { groups } = this.props;
    // this conditional helped fix the issue with
    // groups being repeated in the store
    if (groups.length === 0) {
      this.props.getGroups();
    }
  }

  /**
   * @description gets group details
   *
   * @param {number} groupId -id of the group
   *
   * @returns {void} -returns nothing
   */
  getGroupData(groupId) {
    this.props.getMessages(groupId);
    this.props.getGroupMembers(groupId);
  }

  /**
   * @description render function
   *
   * @returns {jsx} -jsx representation of the component
   */
  render() {
    let groups;
    let userGroups;
    if (this.props.groups.length > 0) {
      groups = this.props.groups;
      userGroups = (
        <ul className="collection">
          {groups.map((group, index) => (
            <li key={index} className="collection-item">
              <Link
                to={`/group/${group.id}`}
                onClick={() => this.getGroupData(group.id)}
              >
                {' '}
                {group.groupName}{' '}
              </Link>{' '}
            </li>
          ))}
        </ul>
      );
    }
    return <div>{userGroups}</div>;
  }
}
UserGroups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.array,
  getMessages: PropTypes.func,
  getGroupMembers: PropTypes.func
};

/**
 * @description Maps state to props
 *
 * @param {object} state -application state
 *
 * @returns {object} -returns part of the state
 */
const mapStateToProps = state => ({
  groups: state.groupReducer.groups
});

/**
 * @description Maps dispatch to props
 *
 * @param {function} dispatch -dispatch function
 *
 * @returns {object} -actions to be dispatched
 */
const mapDispatchToProps = dispatch => ({
  getGroups: () => {
    dispatch(getGroups());
  },
  getMessages: (groupId) => {
    dispatch(getGroupMessages(groupId));
  },
  getGroupMembers: (groupId) => {
    dispatch(getGroupMembers(groupId));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserGroups);
