import React from 'react';
import Nav from '../common/Nav';

/**
 * @description Notfound component
 *
 * @returns {jsx} -jsx representation of the component
 */
const NotFound = () => (
  <div className="black-text">
    <Nav middleLink="Not Found" />
    <h1> Page not found on this server </h1>
  </div>
  );
export default NotFound;
