import express from 'express';
import { signUp, signIn, signOut } from './controllers/userController';
import { create, addMembers, createMessage, getMessages } from './controllers/groupController';
import authenticate from './middleware/authenticate';
import groupAndUserExist from './middleware/exist';

const router = express.Router({ mergeParams: true });

router.post('/user/signup', signUp);

router.post('/user/signin', signIn);

router.use(authenticate);

router.post('/user/signout', signOut);

router.post('/group', create);

router.post('/group/:groupId/user', groupAndUserExist, addMembers);

router.post('/group/:groupId/message', groupAndUserExist, createMessage);

router.get('/group/:groupId/messages', groupAndUserExist, getMessages);

module.exports = router;
