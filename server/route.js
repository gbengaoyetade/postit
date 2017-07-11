const express = require('express');
const router= express.Router();
const userController = require('./controllers/userController');

router.post('/api/user/signup', userController.signup);

// router.post('/api/user/signin',userController.signin);

// router.post('/api/group',groupController.create);

// router.post('/api/group/:id/user',groupController.createMembers);

router.post('/api/group/:id/message', (req, res) => {
  res.send(req.params);
});

router.get('/api/group/:id/messages', (req, res) => {
  res.send(req.params.id);
});
router.post('/test', (req, res) => {
  //let body = JSON.stringify(req.body);
  res.send(req.body);
  console.log(JSON.stringify(req.body));
});
module.exports = router;
