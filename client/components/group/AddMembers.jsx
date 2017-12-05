import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import AppNav from '../common/AppNav';
import { searchUser } from '../../actions/searchActions';
import { addMember, getGroupMembers, addMemberSuccess }
from '../../actions/groupActions';

/**
 *
 *
 * @class AddMembers
 * @extends {React.Component}
 */
class AddMembers extends React.Component {

  /**
   * Creates an instance of AddMembers.
   * @param {object} props - react props
   * @returns {void}
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
   * @memberof AddMembers
   */
  componentWillMount() {
    this.props.getGroupMembers(this.props.match.params.groupId);
  }
  /**
   *
   *
   * @param {object} event -javascript event
   * @returns {void}
   * @memberof AddMembers
   */
  handleSearch(event) {
    this.setState({ userInput: event.target.value });
    if (this.state.userInput.length > 0) {
      this.props.searchUsers(this.state.userInput, 0, this.state.limit);
    }
  }
  /**
   *
   *
   * @param {object} page -the current selected page
   * @returns {void}
   * @memberof AddMembers
   *
   */
  handlePageClick(page) {
    const offset = page.selected * 3;
    this.props.searchUsers(this.state.userInput, offset, this.state.limit);
  }
  /**
   *
   *
   * @param {number} userId -user Id
   * @returns {void}
   * @memberof AddMembers
   */
  addMember(userId) {
    const groupId = this.props.match.params.groupId;
    this.props.addMember(userId, groupId);
  }
  /**
   *
   *
   * @returns {object} -React element
   * @memberof AddMembers
   */
  render() {
    let searchResult;
    // if member was added successfull, fetch group members again
    if (this.props.addMemberSuccess) {
      this.props.getGroupMembers(this.props.match.params.groupId);
      Materialize.toast('User added successfully', 2000);
      this.props.setAddMembersSucces(false);
    }
    if (this.props.searchResult.searchResult) {
      const searchResultArray = this.props.searchResult.searchResult.users;
      const groupMemberIds = this.props.groupMembers.users.map(member =>
        member.id
    );
    // show search result only when input length is greater than 1 and
    // there is some search result to show
      if (searchResultArray.length > 0 && this.state.userInput.length > 0) {
        const pageCount = this.props.searchResult.searchResult.pageCount;
        searchResult = (
          <div>
          <ul className="collection" >
            {searchResultArray.map(user => (
              <li className="collection-item" key={user.id}>
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
                {user.fullName}
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
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          onPageChange={this.handlePageClick}
          className="center col"
          /> </div> : null}
        </div>
      );
      } else {
        searchResult = '';
      }
    }
    return (
      <div className="row">
        <AppNav />
        <div className="col m6 component-container" >
          <h5 className="center">Search users</h5>
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
    );
  }
}
AddMembers.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  getGroupMembers: PropTypes.func.isRequired,
  setAddMembersSucces: PropTypes.func.isRequired,
  addMemberSuccess: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  searchResult: PropTypes.object,
  groupMembers: PropTypes.object,
};
const mapStateToProps = state => (
  {
    searchResult: state.searchReducer,
    addMemberSuccess: state.groupReducer.memberAdded,
    groupMembers: state.groupReducer.members,
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
    getGroupMembers: (groupId) => {
      dispatch(getGroupMembers(groupId));
    },
    setAddMembersSucces: (bool) => {
      dispatch(addMemberSuccess(bool));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AddMembers);
