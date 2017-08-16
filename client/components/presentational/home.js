import React from 'react';

const Home = (props) => {
  return (
    <div className="container" >
      <div className="row" > 
        {props.children}
      </div>
    </div>
    );
};
export default Home;
