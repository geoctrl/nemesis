const config = require('./webpack.config');
const webpack = require('webpack');

config.mode = 'production';
config.devtool = false;
config.plugins.push(
  new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(false),
  })
);
module.exports = config;
