import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDev from '../webpack.dev.config';
import webpackProduction from '../webpack.production.config';
import router from './routes';

dotenv.config();
let webpackConfig;

// This conditional statement ensures a different webpack configuration
// gets used in production
if (process.env.NODE_ENV) {
  webpackConfig = webpackProduction;
} else {
  webpackConfig = webpackDev;
}
const app = express();
const compiler = webpack(webpackConfig);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(webpackMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', router);

app.get('/doc', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/doc/', 'index.html'));
});
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.post('*', (req, res) => {
  res.status(404).json({ message: 'URL does not exist on this server' });
});
export default app;

