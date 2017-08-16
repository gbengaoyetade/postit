import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './route';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.post('*', (req, res) => {
  res.json({ message: 'URL does not exist on this server' });
});
module.exports = app;

