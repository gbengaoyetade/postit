import jwt from 'jsonwebtoken';

export const validateInput = (request, requiredFields) => {
  for (let counter = 0; counter < requiredFields.length; counter += 1) {
    if (!request.hasOwnProperty(requiredFields[counter])) {
      return `${requiredFields[counter]} field not provided`;
    }
  }
  return 'ok';
};

export const verifyToken = (req, res) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'andela-bootcamp', (err) => {
      if (err) {
        res.status(401).json({ message: 'Token authentication failure' });
      } else {
        res.json({ message: 'Token verified' });
      }
    });
  } else {
    res.status(400).json({ error: 'Token error', message: 'No token provided' });
  }
};
