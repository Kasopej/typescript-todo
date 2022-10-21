const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  target: 'browserslist',
  entry: ['./src/index.ts'],
  output: {
    filename: '[name].[contenthash].bundle.js',
    asyncChunks: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js', '...'],
  },
  module: {
    rules: [
      { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset',
        generator: {
          //filename: 'fonts/[name]-[hash][ext][query]'
          filename: 'fonts/[name][ext][query]',
        },
      },
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                { targets: { node: 'current' } },
                '@babel/preset-typescript',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
    port: 'auto',
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
    }),
    new ForkTsCheckerWebpackPlugin({}),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'Type Check',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
