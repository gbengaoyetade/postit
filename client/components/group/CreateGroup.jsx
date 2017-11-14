import React from 'react';
import { connect } from 'react-redux';
import CreateGroupForm from './CreateGroupForm';
import { createGroup } from '../../actions/groupActions';

class CreateGroup extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      groupName: '',
      groupDescription: '',
    };
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.createGroup(this.state, this.props.history);
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

const mapDispatchToProps = dispatch => (
  {
    createGroup: (group, history) => {
      dispatch(createGroup(group, history));
    },
  }
);

export default connect(null, mapDispatchToProps)(CreateGroup);
