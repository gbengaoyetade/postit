import React from 'react';
import PropTypes from 'prop-types';
import AppNav from '../common/AppNav';

/**
 * @param {object} props
 * @returns {object} -returns react element
 */
const CreateGroupForm = props => (
  (
    <div className="row">
      <AppNav />
      <div className="col s12 m6 component-container">
        <div className="modal-content">
          <form onSubmit={props.handleSubmit}>
          <p className="postit-text red-text center"> &nbsp; {props.error} </p>
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
          <p className="row"> <input type="submit" value="Create Group"
          className="btn light-blue darken-4 col s8 offset-s2" />
          </p>
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
