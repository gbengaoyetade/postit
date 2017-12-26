import React from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../common/SubmitButton';

/**
 * @description create group form component
 *
 * @param { object } props -prop object
 *
 * @returns { object } -returns react element
 */
const CreateGroupForm = props => (
  (
    <div>
      <div className="col s12 m4 offset-m2 component-container">
        <div className="modal-content">
          <form onSubmit={props.handleSubmit}>
          <p className="red-text center"> &nbsp; {props.error} </p>
          <div className="input-field">
            <input type="text" name="groupName" id="groupName"
            onChange={props.handleChange} required/>
            <label htmlFor="groupName" >Group Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="groupDescription" id="groupDescription"
            onChange={props.handleChange} required/>
            <label htmlFor="password">Group Description</label>
          </div>
          <SubmitButton
          submitValue="Create Group"
          />
          </form>
          <p> &nbsp; </p>
        </div>
      </div>
    </div>
  )
);
CreateGroupForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};
export default CreateGroupForm;
