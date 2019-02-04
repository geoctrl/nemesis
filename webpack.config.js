const path = require('path');
const IcosetWebpackPlugin = require('@icoset/icoset-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const icons = require('./icons');

const config = {};
config.entry = path.resolve(__dirname, 'src/index.js');
config.output = {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'build/'),
  publicPath: '/',
};

config.module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'fast-sass-loader'],
    },
    {
      test: /\.svg$/,
      exclude: /node_modules/,
      loader: 'svg-inline-loader',
    },
  ],
};

config.plugins = [
  // new IcosetWebpackPlugin({
  //   directory: path.resolve(
  //     __dirname,
  //     'node_modules/@fortawesome/fontawesome-pro/svgs'
  //   ),
  //   icons,
  // }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
  }),
];

config.devServer = {
  index: 'index.html',
  contentBase: path.resolve(__dirname, 'src'),
  historyApiFallback: true,
};

module.exports = config;