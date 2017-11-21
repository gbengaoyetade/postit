import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = props => (
  <div className="row">
    <input type="submit"
    value={props.submitValue}
    className="btn light-blue darken-4 col m4 offset-m4"
    disabled={props.disabled}
    />
  </div>
);
SubmitButton.propTypes = {
  submitValue: PropTypes.string.isRequired,
  disabled: PropTypes.string,
};
export default SubmitButton;
