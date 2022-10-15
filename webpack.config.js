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
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    hot: true,
    port: 'auto',
    open: true,
  },
};
