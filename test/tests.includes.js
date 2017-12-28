import mockery from 'mockery';
import nodemailerMock from 'nodemailer-mock';
import database from '../server/models/';
import { generateToken } from '../server/includes/helperFunctions';


mockery.enable({
  warnOnUnregistered: false,
});
mockery.registerMock('nodemailer', nodemailerMock);

export default () => {
  database.groups.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  database.groups.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  database.groupMembers.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  database.users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  const userDetails1 = {
    fullName: 'gbenga Oyetade',
    username: 'apptest',
    password: 'some password',
    email: 'apptest@gmail.com',
    phoneNumber: '+2348064140695' };
  const userDetails2 = {
    fullName: 'gbenga Oyetade',
    username: 'apptest2',
    password: 'some password',
    email: 'apptest2@gmail.com',
    phoneNumber: '+223480641406925' };
  const group = {
    groupName: 'test',
    groupDescription: 'test',
    createdBy: 1 };
  const group2 = {
    groupName: 'test2',
    groupDescription: 'test2',
    createdBy: 1 };
  const message = {
    groupId: 2,
    userId: 1,
    messageBody: 'message body',
    messagePriority: 'Normal' };
  database.users.create(userDetails1);
  database.users.create(userDetails2);
  database.groups.create(group);
  database.groups.create(group2)
  .then((groupData) => {
    const groupMember = { userId: 2, groupId: groupData.id, addedBy: 1 };
    database.groupMembers.create(groupMember);
  });
  database.messages.create(message);
  const userDetailsWithId = {
    fullName: 'gbenga Oyetade',
    username: 'apptest',
    password: 'some password',
    email: 'apptest@gmail.com',
    phoneNumber: '+2348064140695',
    id: 1 };
  const userDetailsWithId2 = {
    fullName: 'gbenga Oyetade',
    username: 'apptest',
    password: 'some password',
    email: 'apptest@gmail.com',
    phoneNumber: '+2348064140695',
    id: 2 };
  const token1 = generateToken(userDetailsWithId);
  const token2 = generateToken(userDetailsWithId2);
  return { token1, token2 };
};

