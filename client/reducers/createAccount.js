import createUser from './createUser.js';

const createAccount = (state, action) => {
  switch (action.type) {
    case 'CREATE_USER':
      const newState = Object.assign({}, state);
      newState.user = action.username + "from store";
      return newState;
    default:
      return state;
  }
};
export default createAccount;
