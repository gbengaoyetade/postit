import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { searchUser } from '../../actions/searchActions';
import GroupMembers from './GroupMembers';
import { addMember, getGroupMembers, addMemberSuccess }
from '../../actions/groupActions';

/**
 *
 * @class AddMembers
 *
 * @extends { React.Component }
 */
export class AddMembers extends React.Component {

  /**
   * @description Creates an instance of AddMembers.
   *
   * @param {object} props -react props
   *
   * @returns {void} -returns nothing
   */
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.addMember = this.addMember.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = { userInput: '', limit: 3 };
  }

  /**
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getGroupMembers(this.props.match.params.groupId);
  }

  /**
   * @description handles user search
   *
   * @param {object} event -javascript event
   *
   * @returns {void}
   */
  handleSearch(event) {
    this.setState({ userInput: event.target.value });
    if (this.state.userInput.length > 0) {
      this.props.searchUsers(this.state.userInput, 0, this.state.limit);
    }
  }

  /**
   * @description handles page clicks
   *
   * @param {object} page -the current selected page
   *
   * @returns {void}
   *
   */
  handlePageClick(page) {
    const offset = page.selected * 3;
    this.props.searchUsers(this.state.userInput, offset, this.state.limit);
  }

  /**
   * @description handles add user to group
   *
   * @param {number} userId -user Id
   *
   * @returns {void}
   */
  addMember(userId) {
    const groupId = this.props.match.params.groupId;
    this.props.addMember(userId, groupId);
  }

  /**
   * @description render function
   *
   * @returns {jsx} -jsx representation of the component
   */
  render() {
    let searchResult;
    let searchError = '';
    if (this.props.searchError.length > 0) {
        searchError = this.props.searchError;
    }
    if (this.props.searchResult.users) {
      const searchResultArray = this.props.searchResult.users;
      const groupMemberIds = this.props.groupMembers.map(member =>
        member.id
    );
    // show search result only when input length is greater than 1 and
    // there is some search result to show
      if (searchResultArray.length > 0 && this.state.userInput.length > 0) {
        const pageCount = this.props.searchResult.pageCount;
        searchResult = (
          <div>
          <ul className="collection" id="search-results">
            {searchResultArray.map(user => (
              <li className="collection-item search-item" key={user.id}>
                {groupMemberIds.includes(user.id) ?
                <span className="right"> Group member </span>
                 :
                 <Link
                  to='#'
                  className="right small btn light-blue darken-4"
                  onClick={() => { this.addMember(user.id); }}
                > Add
                </Link>
                }
                <span className="search-username">
                  {user.fullName}
                </span>
                <div className="clearfix" />
              </li>
          ))
          }
          </ul>
          {pageCount > 1 ?
          <div className="center">
          <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href=''>...</a>}
          breakClassName={'break-me'}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          pageCount= {pageCount}
          containerClassName={'pagination'}
          subContainerClassName={'pages-pagination'}
          activeClassName={'active'}
          onPageChange={this.handlePageClick}
          className="center-col"
          /> </div> : null}
        </div>
      );
      } else {
        searchResult = '';
      }
    }
    return (
      <div>
        <div className="col m7 s10 offset-s1 component-container" >
          <div className="col m8 offset-m2">
          <h5 className="center">Search users</h5>
          <p> {searchError}</p>
          <form>
            <div className="input-field">
              <input
              id="search" type="search" autoComplete="off"
              name="userSearch" onChange={this.handleSearch}
              />
              <label htmlFor="search"> Search users </label>
            </div>
          </form>
          <p className="big center"> Search result appears here</p>
          {searchResult}
        </div>
        </div>
        <GroupMembers />
      </div>
    );
  }
}
AddMembers.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  setAddMembersSucces: PropTypes.func.isRequired,
  addMemberSuccess: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  searchResult: PropTypes.object,
  groupMembers: PropTypes.array,
  searchError: PropTypes.string,
};
  /**
   * @description Maps state to props
   *
   * @param {object} state -application state
   *
   * @returns {object} -returns part of the state
  */
const mapStateToProps = state => (
  {
    searchResult: state.searchReducer.searchResult,
    searchError: state.searchReducer.searchError,
    addMemberSuccess: state.groupReducer.memberAdded,
    groupMembers: state.groupReducer.members,
  }
);
/**
 * @description Maps dispatch to props
 *
 * @param {function} dispatch -dispatch function
 *
 * @returns {object} -actions to be dispatched
 */
const mapDispatchToProps = dispatch => (
  {
    searchUsers: (userInput, groupId) => {
      dispatch(searchUser(userInput, groupId));
    },
    addMember: (userId, groupId) => {
      dispatch(addMember(userId, groupId));
    },
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
    setAddMembersSucces: (bool) => {
      dispatch(addMemberSuccess(bool));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMembers);
