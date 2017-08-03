import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './route';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../template/html', 'index.html'));
});
app.use('/api', router);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Page not available on this server' });
});
module.exports = app;

