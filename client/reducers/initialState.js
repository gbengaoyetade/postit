const initialState = {
  auth: {
    user: {},
    signupError: '',
    loginError: '',
  },
  group: {
    leftGroup: false,
    memberAdded: [],
    members: [],
    groups: [],
    groupError: '',
    currentGroup: {}
  },
  item: {
    loginLoading: false,
    signupLoading: false,
    sendingMail: false
  },
  message: {
    messages: []
  },
  password: {
    passwordUpdated: false,
    emailError: '',
    passwordUpdatedError: '',
  },
  search: {
    searchResult: {},
    searchError: ''
  }
};

export default initialState;
