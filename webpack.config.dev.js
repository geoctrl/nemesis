const config = require('./webpack.config');
const webpack = require('webpack');

config.mode = 'development';
// config.devtool = 'source-map';
config.plugins.push(
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(false),
  })
);
module.exports = config;
