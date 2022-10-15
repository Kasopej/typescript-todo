const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  target: 'browserslist',
  entry: ['./src/index.ts'],
  output: {
    fileName: '[name].[contenthash].bundle.js',
    asyncChunks: true,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.js', '...'],
    },
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css_loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css_loader', 'sass-loader'],
      },
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
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
};
