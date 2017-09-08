import express from 'express';
import { signUp, signIn, resetPassword } from './controllers/userController';
import { create, addMembers, getGroups, leaveGroup } from './controllers/groupController';
import { createMessage, getMessages } from './controllers/messageController';
import authenticate from './middleware/authenticate';
import { groupAndUserExist, groupExist } from './middleware/exist';

const router = express.Router();

router.post('/user/signup', signUp);

router.post('/user/signin', signIn);

router.use(authenticate);

router.post('/group', create);

router.post('/group/:groupId/user', groupAndUserExist, addMembers);

router.post('/group/:groupId/message', createMessage);

router.post('/user/password_reset', resetPassword);

router.get('/group/:groupId/messages', groupAndUserExist, getMessages);

router.get('/group', getGroups);

router.delete('/group/:groupId/user', groupExist, leaveGroup);

export default router;
