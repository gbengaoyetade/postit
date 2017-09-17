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
  const data2 = { fullName: 'gbenga Oyetade', username: 'apptest22', password: 'some password', email: 'apptest22@gmail.com', phoneNumber: '+223480641406925' };
  const group = { groupName: 'test', groupDescription: 'test', createdBy: 1 };
  const group2 = { groupName: 'test2', groupDescription: 'test2', createdBy: 1 };
  const message = { groupId: 2, userId: 1, messageBody: 'message body', messagePriority: 'Normal' };
  db.users.create(data);
  db.users.create(data2);
  db.groups.create(group);
  db.groups.create(group2)
  .then((groupData) => {
    const groupMember = { userId: 2, groupId: groupData.id, addedBy: 1 };
    db.groupMembers.create(groupMember);
  });
  db.messages.create(message);
};
