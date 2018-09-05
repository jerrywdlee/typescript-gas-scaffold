const webpack = require("webpack");
const GasPlugin = require('gas-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');

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
    new CopyWebpackPlugin([
      { from: 'public' }
    ]),
    new GasPlugin(),
    new es3ifyPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        sequences: true,  // join consecutive statemets with the “comma operator”
        properties: false,  // optimize property access: a["foo"] → a.foo
      },
      mangle: false,
      beautify: true,
    }),
  ],
};
