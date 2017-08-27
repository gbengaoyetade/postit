import React from 'react';
import { connect } from 'react-redux';
import GroupPage from '../presentational/group';
import UserNav from '../presentational/usernav';
import Container from '../presentational/container';
import { getGroupMessages } from '../../actions/createGroupAction';

class Group extends React.Component{
  componentDidMount(){
    this.props.getMessages(this.props.match.params.groupId);
  }
  render(){
    return (
      <div>
        <UserNav />
        <Container>
        <GroupPage groupId = {this.props.match.params.groupId}/>
        </Container>
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
