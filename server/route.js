import express from 'express';
import { signUp, signIn, signOut } from './controllers/userController';
import { create, addMembers, createMessage, getMessages } from './controllers/groupController';
import authenticate from './middleware/authenticate';

const router = express.Router();

router.post('/user/signup', signUp);


router.post('/user/signin', signIn);

router.use(authenticate);

router.post('/group', create);

router.post('/group/:id/user', addMembers);

router.post('/group/:id/message', createMessage);

router.post('/user/signout', signOut);

router.get('/group/:groupId/messages', getMessages);

module.exports = router;
