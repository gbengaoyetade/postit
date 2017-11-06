import React from 'react';
import Proptypes from 'prop-types';

const TextInput = props => (
  <div>
    <div className="input-field">
      <input
      type="text" name={props.name}
      id={props.name} onChange={props.handleChange}
      required className={props.classnames} />
      <label htmlFor={props.name}> {props.description} </label>
    </div>
  </div>
);
TextInput.propTypes = {
  name: Proptypes.string.isRequired,
  handleChange: Proptypes.func.isRequired,
  classnames: Proptypes.string,
  description: Proptypes.string.isRequired,
};
export default TextInput;
