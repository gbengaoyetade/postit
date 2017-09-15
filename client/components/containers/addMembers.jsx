import React from 'react';
import { connect } from 'react-redux';
import SideNav from '../presentational/sideNav.jsx';
import { searchUser } from '../../actions/search';
import { addMember } from '../../actions/groupAction';

class AddMembers extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.addMembers = this.addMembers.bind(this);
  }
  handleSearch(event) {
    const groupId = this.props.match.params.groupId;
    const userInput = event.target.value;
    if (userInput.length > 1) {
      this.props.searchUsers(userInput, groupId);
    }
  }
  addMembers(userId) {
    const groupId = this.props.match.params.groupId;
    this.props.addMember(userId, groupId);
  }
  render() {
    let searchResult;
    if (this.props.searchResult.searchResult) {
      const searchResultArray = this.props.searchResult.searchResult.users;
      if (searchResultArray.length > 0) {
        searchResult = (
        <ul className="collection">
          {searchResultArray.map(user => (
            <li className="collection-item" key={user.id}>
              <a
                className="right small btn"
                onClick={() => { this.addMembers(user.id); }}
              > Add
              </a>
              {user.fullName}
              
              <div className="clearfix" />
            </li>
        ))
        }
        </ul>
      );
      } else {
        searchResult = '';
      }
    }
    return (
      <div className="row">
        <SideNav />
        <div className="col m6 component-container" >
          <h5 className="center">Search users</h5>
          <form>
            <div className="input-field">
              <input id="search" type="search" autoComplete="off" name="userSearch" onChange={this.handleSearch} />
              <label htmlFor="search"> Enter user </label>
            </div>
          </form>
          {searchResult}
        </div>
        {/* <div className="col m3 hide-on-med-and-down">
        </div> */}
      </div>
    );
  }
}
AddMembers.propTypes = {
  searchUsers: React.PropTypes.func.isRequired,
};
const mapStateToProps = state => (
  {
    searchResult: state.searchReducer,
    addMemberSuccess: state.searchSuccess,
  }
);
const mapDispatchToProps = dispatch => (
  {
    searchUsers: (userInput, groupId) => {
      dispatch(searchUser(userInput, groupId));
    },
    addMember: (userId, groupId) => {
      dispatch(addMember(userId, groupId));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMembers);
