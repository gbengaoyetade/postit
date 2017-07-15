const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'andela-bootcamp', (err, decoded) => {
      if (err) {
        res.json({ message: 'Token authentication failure' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({ message: 'No token provided' });
  }
};

module.exports = authenticate;
