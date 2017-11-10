const userAuth = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
};
export default userAuth;
