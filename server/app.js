import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import router from './router';

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '../client/bundled')));
app.use('/doc', express.static(path.join(__dirname, '../doc')));
app.use('/api', router);

app.get('/doc', (req, res) => {
  res.sendFile(path.join(__dirname, '../doc', 'index.html'));
});

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.post('*', (req, res) => {
  res.status(404).json({ error: 'URL does not exist on this server' });
});
app.delete('*', (req, res) => {
  res.status(404).json({ error: 'URL does not exist on this server' });
});
export default app;
