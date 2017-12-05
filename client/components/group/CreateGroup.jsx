import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateGroupForm from './CreateGroupForm';
import { createGroup, createGroupError } from '../../actions/groupActions';

/**
 * @class CreateGroup
 * @extends {React.Component}
 */
class CreateGroup extends React.Component {
  /**
   * Creates an instance of CreateGroup.
   * @memberof CreateGroup
   */
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      groupName: '',
      groupDescription: '',
    };
  }
  /**
   *
   * @return {void}
   * @memberof CreateGroup
   */
  componentWillMount() {
    this.props.createGroupError('');
  }
  /**
   * @param {object} event
   * @returns {void} -returns nothing
   * @memberof CreateGroup
   */
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  /**
   * @param {object} event
   * @returns {void} -returns nothing
   * @memberof CreateGroup
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.createGroup(this.state, this.props.history);
  }
  /**
   * @returns {object} -react element
   * @memberof CreateGroup
   */
  render() {
    return (
      <CreateGroupForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        error={this.props.groupError}
      />
    );
  }
}
CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
  createGroupError: PropTypes.func.isRequired,
  groupError: PropTypes.string,
  history: PropTypes.object,
};
const mapStateToProps = state => (
  {
    groupError: state.groupReducer.groupError,
  }
);

const mapDispatchToProps = dispatch => (
  {
    createGroup: (group, history) => {
      dispatch(createGroup(group, history));
    },
    createGroupError: (error) => {
      dispatch(createGroupError(error));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
