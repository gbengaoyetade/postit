import React from 'react';

class Nav extends React.component {
  render() {
    return (
      <div>
        <div className="mdl-layout mdl-js-layout">
        <header className="mdl-layout__header">
        <div className="mdl-layout-icon"></div>
        <div className="mdl-layout__header-row">
        <span className="mdl-layout__title">PostIt</span>
				  <div className="mdl-layout-spacer"></div>
				    <nav className="mdl-navigation">
				      <button className="mdl-button mdl-js-button ">Sign UP</button>
				      <button className="mdl-button mdl-js-button ">Login</button>
				    </nav>
				  </div>
				  </header>  
				</div>
			</div>
			);
	}
}