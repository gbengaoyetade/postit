import React from 'react';

export const InputField = props => (
  <div className="input-field" >
    <input type={props.type}
    name={props.name}
    onChange={props.handleChange}
    required={props.required || ''}
    />
    <label htmlFor="password">{props.labelValue}</label>
  </div>
);

export const Submit = props => (
  <div className="row">
    <input type="submit"
    value={props.submitValue}
    className="btn light-blue darken-4 col m4 offset-m4"
    />
  </div>
);
