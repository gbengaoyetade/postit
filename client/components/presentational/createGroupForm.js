import React from 'react';

const groupModal = (props) => {
  return (
    <div>
      <div id="createGroupModal" className="modal col s5">
        <div className="modal-content">
          <form method="POST"  className="white-text" onSubmit={props.handleSubmit}>
          <div className="input-field">
            <input type="text" name="groupName" id="groupName" onChange={props.handleChange} required/>
            <label htmlFor="groupName" >Group Name</label>
          </div> 
          <div className="input-field">
            <input type="text" name="groupDescription" id="groupDescription" onChange={props.handleChange} required/>
            <label htmlFor="password">Group Description</label>
          </div>
          <p className="row"> <input type="submit" value="Create Group" className="btn light-blue darken-4 col s8 offset-s2" />
          </p>
      </form>
        </div>
      </div>
    </div>
    );
};
export default groupModal;
