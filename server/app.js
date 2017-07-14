import express from 'express';
import bodyParser from 'body-parser';
import router from './route';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ 
    message: 'Welcome to Posit.',
    direction: 'If a you are a new user, visit postit-main.herokuapp.com/api/user/signup to signup \n or visit postit-main.herokuapp.com/api/user/signin' });
});

app.use('/api', router);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Page not availabel on this server' });
});
module.exports = app;

