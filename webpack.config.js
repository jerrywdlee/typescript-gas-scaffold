const GasPlugin = require('gas-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const MinifyGas = require('./plugins/minify-gas');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      { test: /\.ts?$/, loader: 'awesome-typescript-loader' },
    ],
  },
  plugins: [
    new GasPlugin(),
    new es3ifyPlugin(),
    new MinifyGas(),
  ],
};
