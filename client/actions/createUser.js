const createUser = (user) => {
  return {
    type: 'CREATE_USER',
    user,
  };
};

export default createUser;
