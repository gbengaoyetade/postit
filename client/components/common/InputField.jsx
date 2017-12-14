import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 *
 * @param {object} props
 * @returns {object} -returns react element
 */
const InputField = props => (
  <div className="input-field" >
    <input
    type={props.type}
    name={props.name}
    onBlur={props.handleChange}
    required={props.required || ''}
    className={props.classnames || null}
    />
    <label htmlFor="password">{props.labelValue}</label>
  </div>
);
InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classnames: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.string,
  labelValue: PropTypes.string.isRequired,
};
export default InputField;