import React from 'react';

const UserNav = (props) => {
  return (

    <div>
      <nav>
        <div className="nav-wrapper blue ">
          <a href="#!" className="brand-logo">Postit</a>
          <ul className="right hide-on-med-and-down">
            <li><a href="sass.html"><i className="material-icons">search</i></a></li>
            <li><a href="badges.html"><i className="material-icons">bell</i></a></li>
            <li><a href="collapsible.html"><i className="material-icons">user</i></a></li>
          </ul>
        </div>
      </nav>
    </div>
    );
}
export default UserNav;