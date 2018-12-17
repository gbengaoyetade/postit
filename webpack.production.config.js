const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: 'client/index.html'
});

module.exports = {
  entry: ['webpack-hot-middleware/client', './client/index.js'],
  output: {
    path: path.resolve('./client/bundled'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, '/server/shared/')
        ],
        loader: ['babel-loader']
      },
      {
        test: /\.scss$/,
        include: /client/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'bundle.[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    htmlPlugin
  ],
  mode: 'production'
};
