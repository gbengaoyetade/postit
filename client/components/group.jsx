 import React from 'react';
// import axios from 'axios';

// class Group extends React.Component{
//   componentDidMount(){
//     axios.get('/api/group');
//   }

// }
const Group = (props) => {
  console.log(window.sessionStorage.postitToken);
  return (
    <h1> This is the group component </h1>
    );
}
export default Group;
