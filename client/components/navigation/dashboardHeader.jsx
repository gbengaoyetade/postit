import React from 'react';

const DashboardHeader = ({ numberOfGroupMembers, groupName, currentUrl }) => {
  // this if statement checks if the currentUrl props is set
  // if it is not set, display nothing in the header
  // else display the dashboard header component
  if (!currentUrl) {
    return <div />;
  }
  return (
    <div>
      <div className="dashboard-header row">
        <a className="right">
        <a href="#" className="right dropdown-button"
        data-activates="group-more">
        <i className="material-icons">more_vert</i>
        </a>
        <i className="material-icons">person</i>
        <span className="group-members"> {numberOfGroupMembers}</span></a>
        <span className="bold">{groupName}</span>
      </div>
    </div>
  );
};
export default DashboardHeader;
