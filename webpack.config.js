const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  devServer: {
    hot: true
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
        use: ['style-loader','css-loader']
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
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
