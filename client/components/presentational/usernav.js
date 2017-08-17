import React from 'react';

const UserNav = (props) => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper  light-blue darken-4 ">
          <a href="#!" className="left brand-logo">Postit</a>
          <ul className="right hide-on-med-and-down">
            <form>
              <div className="input-field">
                <input type="search" id="search" required/>
                <label htmlFor="search" className="label-icon">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </ul>
        </div>
      </nav>
    </div>
    );
}
export default UserNav;
