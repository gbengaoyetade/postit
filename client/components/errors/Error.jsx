import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @description Error component
 *
 * @returns {jsx} -jsx representation of the component
 */
const Error = () => (
  <div className="grey-text">
    <h1>You are not allowed to view the page you just requested </h1>
    <p>Got back to <Link to="dashboard"> dashboard </Link> </p>
  </div>
);
export default Error;
