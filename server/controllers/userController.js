const User = require('../models').users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

signUp(req, res) {
  if ( validateInput (req.body).paramsOk) {
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })
    .then(user => {
      const data = {
        paramsOk: true,
        createSuccess: 'User ' + req.body.username + " was created successfully",
    }
      res.status(201).send(data);
    })
    .catch((error) => {
      let errorMessage;
      if (error.errors[0].message == 'username must be unique'){
          errorMessage = 'Username not available';
        }
      else if (error.errors[0].message == 'email must be unique'){
        errorMessage = 'Email address already in use';
      }
      else{
        errorMessage = error.errors[0].message;
      }
      const data = {
        paramsOk: true,
        message: errorMessage,            
      }
      res.status(400).json(data);

    });
      
  
      
}
  else {
   res.send(JSON.stringify(validateInput(req.body)));
 }

  }, // end of signup

 signIn(req, res){

  User.findOne({
    where:{username:req.body.username},
  })
  .then(user => {
      if(user == null){
        res.send('could not find user');
      }
      else{
        bcrypt.compare(req.body.password,user.password, (err, result) => {
          if(result){
            const token = jwt.sign({name:user.username}, 
              'andela-bootcamp', 
              { expiresIn: 60 * 60 }
              );
            const data = {
              paramsOk: true,
              message: 'Login was successful',
              token: token,
            }
            res.send(data);
          }
          else{
            const data = {
              paramsOk: true,
              message: 'Incorrect user details',
            };
            res.send(data);
          }
        });
      }
  })
  .catch((error) => {
    res.send("Database error");
  });
 },
 signOut(req, res) {

 },
};
const validateInput = (input) => {
  const Result = {};
  if (input.username && input.email && input.password) {
    Result.paramsOk = true;
  }
  else {
    Result.paramsOk = false;
  }
  return Result;
};
