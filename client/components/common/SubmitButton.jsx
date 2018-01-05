import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description SubmitButton component
 *
 * @param {object} props -prop object
 *
 * @returns {jsx} -jsx representation of the component
 */
const SubmitButton = props => (
  <div>
    <p className="center">
    <input
      type="submit"
      value={props.submitValue}
      className="btn light-blue darken-4 "
      disabled={props.disabled}
    />
    </p>
  </div>
);
SubmitButton.propTypes = {
  submitValue: PropTypes.string.isRequired,
  disabled: PropTypes.string,
};
export default SubmitButton;
