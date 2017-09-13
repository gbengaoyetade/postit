import React from 'react';

const Group = props => (
  <div className="row">
    <div className="col m2 component-container hide-on-med-and-down" >
      <h5 className="center"> Navigations </h5>
    </div>
    <div className="col m5 offset-m1 s10 component-container">
      <h5 className="center"> Messages </h5>
      {props.groupMessages}
    </div>
    <div className="col m3 offset-m1 component-container hide-on-med-and-down">
      <h5 className="center"> Group Members </h5>
      {props.groupMembers}
    </div>
  </div>
);
export default Group;
