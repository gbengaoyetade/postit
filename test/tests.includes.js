import mockery from 'mockery';
import nodemailerMock from 'nodemailer-mock';
import models from '../server/models';
import { generateToken } from '../server/includes/helperFunctions';

const { users, groups, groupMembers, messages } = models;
mockery.enable({
  warnOnUnregistered: false,
});
mockery.registerMock('nodemailer', nodemailerMock);


/**
 * @description creates seed data for test cases
 *
 * @returns { void } -returns nothing
 */
export const seedDatabase = () => {
  groups.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  groups.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  groupMembers.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  users.destroy({
    cascade: true,
    truncate: true,
    restartIdentity: true,
  });
  const userDetails1 = {
    fullName: 'Gbenga Oyetade',
    username: 'apptest',
    password: 'some password',
    email: 'apptest@gmail.com',
    phoneNumber: '+2348064140695' };
  const userDetails2 = {
    fullName: 'Gbenga Oyetade',
    username: 'apptest2',
    password: 'some password',
    email: 'apptest2@gmail.com',
    phoneNumber: '+23480641406995' };
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
  users.create(userDetails1);
  users.create(userDetails2);
  groups.create(group);
  groups.create(group2)
  .then((groupData) => {
    const groupMember = { userId: 2, groupId: groupData.id, addedBy: 1 };
    groupMembers.create(groupMember);
  });
  messages.create(message);
};

/**
 * @description creates tokens for tests cases
 *
 * @returns { object } -returns tokens
 */
export const tokens = () => {
  const userDetailsWithId = {
    fullName: 'Gbenga Oyetade',
    username: 'apptest',
    password: 'some password',
    email: 'apptest@gmail.com',
    phoneNumber: '+2348064140695',
    id: 1 };
  const userDetailsWithId2 = {
    fullName: 'Gbenga Oyetade',
    username: 'apptest2',
    password: 'some password',
    email: 'apptest@gmail.com',
    phoneNumber: '+2348064140695',
    id: 2 };
  const token1 = generateToken(userDetailsWithId);
  const token2 = generateToken(userDetailsWithId2);
  return { token1, token2 };
};

