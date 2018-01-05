import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

/**
 * @description Dashboard class
 *
 * @class Dashboard
 *
 * @extends {React.Component}
 */
export class Dashboard extends React.Component {

  /**
   * @description render fucntion
   *
   * @returns {jsx} -jsx representation of the component
   */
  render() {
    let groups;
    let userGroups;
    if (this.props.groups.length > 0) {
      groups = this.props.groups;
      userGroups = (
        groups.map(group => (
          <div className="postit-card col m3 s5" key={group.id}>
          <p className="header">
            <Link className="" to={`/group/${group.id}`}>
            {group.groupName}
            </Link>
          </p>
          <p>{group.groupDescription} </p>
          <p className="bottom-element">
            Active: <span className="bold">
            {group.messages[0] ?
              moment(group.messages[0].updatedAt).fromNow() :
              'Not yet active' }
            </span>
          </p>
        </div>
        ))
      );
    }
    return (
      <div>
        <div
          className="col m7 offset-m1 s12 component-container groups-display">
          <p className="center header">My Groups</p>
          <div className="divider"/>
          {userGroups}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  groups: PropTypes.array.isRequired,
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
    groups: state.groupReducer.groups,
  }
);

export default connect(mapStateToProps, null)(Dashboard);
