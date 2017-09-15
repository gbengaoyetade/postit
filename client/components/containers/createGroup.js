import React from 'react';
import { connect } from 'react-redux';
import CreateGroupForm from '../presentational/createGroupForm.jsx';
import { sendGroupDetails } from '../../actions/groupAction';

class CreateGroup extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.props.group[name] = value;
    console.log(this.props.group);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createGroup(this.props.group, this.props.history);
  }
  render() {
    return (
      <CreateGroupForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
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
    createGroup: (group, history) => {
      dispatch(sendGroupDetails(group, history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
