const webpack = require('webpack'); // eslint-disable-line
const path = require('path');

module.exports = {
  entry: ['webpack-hot-middleware/client', './client/index.js'],
  output: {
    path: path.resolve('./client/dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, '/server/shared/')
        ],
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        include: /client/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader' }]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  mode: 'development'
};
