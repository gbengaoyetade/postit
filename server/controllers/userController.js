const User = require('../models').users;



module.exports = {

signup(req, res) {
  if ( validateInput (req.body).paramsOk) {

    return User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })

    .then(todo => res.status(201).send(todo))
    .catch(error => res.status(400).send(error));
}
  else {
   res.send(JSON.stringify(validateInput(req.body)));
 }

  } // end of signup
 
};

const validateInput = (input) => {
  const Result = {};
  if (input.username && input.email && input.password){
    Result.paramsOk = true;
  }
  else {
    Result.paramsOk = false;
  }
  return Result;
}

const validateEmail = (email) => {

}

const valitateUsername = (username) => {

}

const validatePassword =(password) => {

}
