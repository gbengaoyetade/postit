import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateGroupForm from './CreateGroupForm';
import { createGroup, createGroupError } from '../../actions/groupActions';

/**
 * @class CreateGroup
 *
 * @extends {React.Component}
 */
export class CreateGroup extends React.Component {

  /**
   * @description Creates an instance of CreateGroup.
   *
   * @returns {void}
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
   */
  componentDidMount() {
    this.props.createGroupError('');
  }

  /**
   * @description handles the onChange event
   *
   * @param {object} event - event object
   *
   * @returns {void} -returns nothing
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /**
   * @description handles form submission
   *
   * @param {object} event -event object
   *
   * @returns {void} -returns nothing
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.createGroup(this.state, this.props.history);
  }

  /**
   * @description render function
   *
   * @returns {object} -react element
   */
  render() {
    return (
      <div>
        <CreateGroupForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          error={this.props.groupError}
        />
      </div>
    );
  }
}
CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
  createGroupError: PropTypes.func.isRequired,
  groupError: PropTypes.string,
  history: PropTypes.object,
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
    groupError: state.groupReducer.groupError,
  }
);

/**
 * @description Maps dispatch to props
 *
 * @param {function} dispatch -dispatch function
 *
 * @returns {object} -actions to be dispatched
 */
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
