import React from 'react';
import Nav from '../common/Nav';

/**
 * @description Notfound component. It is
 * render for routes not belonging to the app
 *
 * @returns {object} -returns react element
 */
const NotFound = () => (
  <div className="black-text">
    <Nav middleLink="Not Found" />
    <h1> Page not found on this server </h1>
  </div>
  );
export default NotFound;
