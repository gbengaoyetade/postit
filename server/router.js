import express from 'express';
import { signUp, signIn, resetPassword, updatePassword, userSearch }
from './controllers/userController';
import routeValidation from './includes/routeValidation';
import { create, addMembers, getGroups, leaveGroup, getGroupMembers }
from './controllers/groupController';
import { createMessage, getMessages } from './controllers/messageController';
import authenticate from './middleware/authenticate';
import { groupAndUserExist, groupExist } from './middleware/exist';

const router = express.Router();
const validations = routeValidation();

router.post('/user/signup',
validations.signUp, signUp);

router.post('/user/signin',
validations.signIn, signIn);

router.post('/user/password/reset',
validations.resetPassword, resetPassword);

router.post('/user/password/update',
validations.updatePassword, updatePassword);


router.use(authenticate);

router.post('/group',
validations.createGroup, create);

router.post('/group/:groupId/user',
validations.addMembers,
groupAndUserExist, addMembers);

router.post('/group/:groupId/message',
validations.createMessage,
createMessage);

router.get('/group/:groupId/messages', groupExist, getMessages);

router.get('/group/user', getGroups);

router.get('/group/:groupId/users', groupExist, getGroupMembers);

router.get('/user/search', validations.userSearch, userSearch);

router.delete('/group/:groupId/leave', groupExist, leaveGroup);

export default router;
