const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  devtool: isDev ? 'inline-source-map': '',
  entry: {
    app: './client/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'client', 'dist'),
    publicPath: '/'
  },
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
