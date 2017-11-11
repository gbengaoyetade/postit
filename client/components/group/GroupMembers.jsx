import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGroupMembers, leaveGroup } from '../../actions/groupActions';

class GroupMembers extends React.Component {
  constructor() {
    super();
    this.leaveGroup = this.leaveGroup.bind(this);
  }
  componentDidMount() {
    const groupId = this.props.groupId;
    this.props.getGroupMembers(groupId);
  }
  leaveGroup() {
    const groupId = this.props.groupId;
    this.props.leaveGroup(groupId, this.props.history);
  }
  render() {
    let groupMembersList;
    if (this.props.groupMembers.members) {
      const members = this.props.groupMembers.members;
      groupMembersList = (<ul className="collection">
        {members.map(member => (
          <li key={member.id} className="collection-item center">
            <a> {member.fullName} </a></li>
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
        <div id="modal1" className="modal">
          <div className="modal-content">
            <p>Are you sure you want to leave Group?</p>
          </div>
          <div className="modal-footer">
            <a
              href="#"
              className="modal-action modal-close waves-effect waves-green btn"
              onClick={this.leaveGroup}
            >Yes</a>
            <a href="#" className=
            "modal-action modal-close waves-effect waves-green btn red">No</a>
          </div>
        </div>
      </div>
    );
  }
}
GroupMembers.propTypes = {
  leaveGroup: React.PropTypes.func.isRequired,
  getGroupMembers: React.PropTypes.func.isRequired,
};
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
    leaveGroup: (groupId, history) => {
      dispatch(leaveGroup(groupId, history));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);

