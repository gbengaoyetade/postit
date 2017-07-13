const express = require('express');
const userController = require('./controllers/userController');
const groupController = require('./controllers/groupController');
const authenticate = require('./middleware/authenticate');

const router = express.Router();

router.post('/user/signup', userController.signUp);

// router.use(authenticate);
router.post('/user/signin', userController.signIn);

router.post('/group', groupController.create);

router.post('/group/:id/user', groupController.addMembers);

router.post('/group/:id/message', groupController.createMessage);

router.post('/user/signout',userController.signOut);

router.get('/group/:groupId/messages', groupController.getMessages);



module.exports = router;
