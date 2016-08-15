/* eslint import/no-extraneous-dependencies: ["error", { "devDependencies": true }] */

// Node.js imports
const path = require('path');

// Vendor imports
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const include = path.join(__dirname, 'src');

const config = {
  output: {
    library: 'GpsToGpx',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
      sourceMap: true,
    })
  );
}

module.exports = config;
