const webpackConfig = require('webpack-config');
const webpack = require('webpack');

const packageFile = require('./package.json');
const config = packageFile.pipToolConfig;

const {
  webpackBaseFile
} = config;

// const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
//   minimize: true,
//   output: {
//     comments: false
//   },
//   compress: {
//     warnings: false
//   }
// });

module.exports = new webpackConfig.Config()
  .extend(webpackBaseFile)
  .merge({
    // devtool: 'source-map',
    plugins: [
      // uglifyPlugin
    ]
  });
