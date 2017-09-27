import React from 'react';

const DashboardHeader = ({ numberOfGroupMembers, groupId, groupName, currentUrl }) => {
  // this if statement checks if the currentUrl props is set
  // it is only the dashboard component that sets this props
  // if it is set, display nothing in the header
  // else display the dashboard header component
  if (currentUrl) {
    return <div />;
  }
  return (
    <div>
      <div className="dashboard-header row">
        <a className="col m3">
          <i className="material-icons">person</i><span className=""> {numberOfGroupMembers} </span></a>
        <a href="#" className="right dropdown-button" data-activates="group-more"> <i className="material-icons">more_vert</i> </a>
        <span className="col m4 offset-m2 bold">{groupName}</span>
      </div>
    </div>
  );
};
export default DashboardHeader;
