import React from 'react';
import { connect } from 'react-redux';
import CreateGroupForm from '../presentational/createGroupForm';
import { sendGroupDetails } from '../../actions/createGroupAction';

class CreateGroup extends React.Component {
  componentDidMount() {
    console.log(window.sessionStorage);
  }
  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    this.props.group[name] = value;
    console.log(this.props.group);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createGroup(this.props.group);
  }
  render() {
    return (
     <CreateGroupForm 
     handleSubmit={this.handleSubmit.bind(this)} 
     handleChange={this.handleChange.bind(this)} 
     />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    group: state.createGroupReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: (group) => {
      dispatch(sendGroupDetails(group));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
