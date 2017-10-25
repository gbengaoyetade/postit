import React from 'react';

const TextInput = props => (
  <div>
    <div className="input-field">
      <input type="text" name={props.name} id={props.name}
      onChange={props.handleChange} required/>
      <label htmlFor={props.name}> {props.description} </label>
    </div>
  </div>
);
export default TextInput;
