const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve('./client/bundled'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: /client/,
        loader: 'babel-loader',
      },
    ],
  },
};
