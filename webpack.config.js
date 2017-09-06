const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve('./client/bundled'),
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: /client/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        include: /client/,
        loaders: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new ExtractTextPlugin('./client/scss/posit.scss', {
      allChunks: true,
    }),
  ],
};
  