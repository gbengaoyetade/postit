import React from 'react';
import { connect } from 'react-redux';
import GroupPage from '../presentational/group';
import UserNav from '../presentational/usernav';
import { getGroupMessages } from '../../actions/groupAction';
import Message from './message';

class Group extends React.Component {
  componentDidMount() {
    this.props.getMessages(this.props.match.params.groupId);
  }
  render() {
    return (
      <div>
        <UserNav />
        <GroupPage />
        <Message />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    group: state.groupReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (groupId) => {
      dispatch(getGroupMessages(groupId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);
