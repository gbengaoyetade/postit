import express from 'express';
import bodyParser from 'body-parser';
import router from './route';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.send({ message: 'Welcome to programming' });
});

app.use('/api', router);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});
module.exports = app;

