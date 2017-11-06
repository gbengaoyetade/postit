import React from 'react';

const Container = props => (
  (
    <div className="container" >
      <div className="row">
        {props.children}
      </div>
    </div>
  )
);
export default Container;
