const path = require('path');
const webpackBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
    port: 'auto',
    open: true,
    watchFiles: ['src/**/*'],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({}),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'Type Check',
    }),
  ],
});
