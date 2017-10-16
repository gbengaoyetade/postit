import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';
import router from './routes';

const app = express();
const compiler = webpack(webpackConfig);
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(webpackMiddleware(compiler));

app.use(webpackHotMiddleware(compiler, {
  hot: true,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(express.static(path.join(__dirname, '../client')));

app.use('/api', router);

app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../client', 'index.html'));
});
app.post('*', (req, res) => {
  res.status(404).json({ message: 'URL does not exist on this server' });
});
export default app;

