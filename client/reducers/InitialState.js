const InitialState = {
  auth: {
    user: {},
    signupError: '',
    loginError: ''
  },
  group: {
    leftGroup: false,
    memberAdded: [],
    members: [],
    groups: [],
    groupError: '',
    currentGroup: {},
    groupIsDeleted: false,
    messages: []
  },
  item: {
    loginLoading: false,
    signupLoading: false,
    sendingMail: false
  },
  message: {
    messages: [],
    gotMessages: false
  },
  password: {
    passwordUpdated: false,
    emailError: '',
    passwordUpdatedError: ''
  },
  search: {
    searchResult: {},
    searchError: ''
  }
};

export default InitialState;
