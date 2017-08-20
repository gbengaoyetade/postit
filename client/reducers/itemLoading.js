const itemLoading = (state = false, action) => {
  switch (action.type) {
    case 'ITEM_LOADING':
      return action.isLoading;
    case 'ITEM_ERROR':
      return action.payload;
    default:
      return state;
  }
};
export default itemLoading;

