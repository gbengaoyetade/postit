import InitialState from '../reducers/InitialState';

/**
 * @description reducer for group actions
 *
 * @param {object} state -state object
 * @param {object} action -action object
 *
 * @returns {object} returns state object
 */
const groupReducer = (state = InitialState.group, action) => {
  switch (action.type) {
    case 'GET_GROUP_MEMBERS':
      return { ...state, members: action.members };
    case 'ADD_MEMBER_SUCCESS':
      return { ...state,
        members: [...state.members, action.memberDetails] };
    case 'GET_USER_GROUPS':
      return { ...state, groups: [...state.groups, ...action.groups] };
    case 'LEAVE_GROUP_SUCCESS':
      return { ...state, leftGroup: action.leftGroup };
    case 'GROUP_LEFT':
      return { ...state,
        groups: state.groups.filter(group => group.id === action.groupId)
      };
    case 'CURRENT_GROUP':
      return { ...state, currentGroup: action.groupDetails };
    case 'CREATE_GROUP_ERROR':
      return { ...state, groupError: action.groupError };
    case 'CREATE_NEW_GROUP':
      return { ...state, groups: [...state.groups, action.groupDetails] };
    default:
      return state;
  }
};
export default groupReducer;

