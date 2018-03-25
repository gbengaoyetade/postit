import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDev from '../webpack.dev.config';
import webpackProduction from '../webpack.production.config';
import router from './router';


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
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/doc', express.static(path.join(__dirname, '../doc')));

app.use('/api', router);

app.get('/doc', (req, res) => {
  res.sendFile(path.join(__dirname, '../doc', 'index.html'));
});

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.post('*', (req, res) => {
  res.status(404).json({ error: 'URL does not exist on this server' });
});
app.delete('*', (req, res) => {
  res.status(404).json({ error: 'URL does not exist on this server' });
});
export default app;

