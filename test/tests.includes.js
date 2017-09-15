import db from '../server/models/';

export default () => {
  db.groups.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  db.groups.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  db.groupMembers.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  db.users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  const data = { fullName: 'gbenga Oyetade', username: 'apptest', password: 'some password', email: 'apptest@gmail.com', phoneNumber: '+2348064140695' };
  const group = { groupName: 'test', groupDescription: 'test', createdBy: 1 };
  const group2 = { groupName: 'test2', groupDescription: 'test2', createdBy: 1 };
  db.users.create(data);
  db.groups.create(group);
  db.groups.create(group2);
};
