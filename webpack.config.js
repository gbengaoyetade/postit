// import webpack from 'webpack';
// import path from 'path';

const webpack = require('webpack');
const path = require('path');
module.exports = {
  devtool: 'eval-source-map',
  entry: './client/index.jsx',
  output: {
    path: path.resolve('./client/bundled'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: /client/,
        loaders: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        include: /client/,
        loaders: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

  ],
};
