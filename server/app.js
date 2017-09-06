import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';
import router from './route';
import { verifyToken } from './includes/functions';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(webpackMiddleware(webpack(webpackConfig)));

app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', router);

app.get('/verifytoken', verifyToken);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.post('*', (req, res) => {
  res.status(404).json({ message: 'URL does not exist on this server' });
});
export default app;

