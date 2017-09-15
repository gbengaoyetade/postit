import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroupMembers } from '../../actions/groupAction';

class GroupMembers extends React.Component {
  componentDidMount() {
    const groupId = this.props.groupId;
    console.log(groupId);
    this.props.getGroupMembers(groupId);
  }
  render() {
    let groupMembersList;
    if (this.props.groupMembers.members) {
      const members = this.props.groupMembers.members;
      groupMembersList = (<ul className="collection">
        {members.map(member => (
          <li className="collection-item center">
            <a> {member.fullName} </a></li>
      ))
      }
      </ul>);
    }
    return (
      <div className="col m3 component-container hide-on-med-and-down">
        <p> &nbsp; </p>
        <div className="row">
          <Link className="btn blue" to={`/group/${this.props.groupId}/addmembers`}> Add Members </Link>
          <a className="btn red" onClick={this.props.leaveGroup}> Leave Group </a>
        </div>
        <p className="center"> Group Members </p>
        {groupMembersList}
      </div>
    );
  }
}
{/* GroupMembers.propTypes = {
  members: React.PropTypes.arrayOf(React.PropTypes.obj),
}; */}
const mapStateToProps = state => (
  {
    groupMembers: state.getGroupMembers,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
    leaveGroup: (groupId) => {
      dispatch(leaveGroup(groupId));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);

