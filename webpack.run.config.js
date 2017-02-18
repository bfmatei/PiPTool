const webpackConfig = require('webpack-config');
const path = require('path');

const packageFile = require('./package.json');
const config = packageFile.pipToolConfig;

const {
  buildFolderName,
  webpackBaseFile,
  runPort
} = config;

const buildPath = path.resolve(__dirname, `./${buildFolderName}`);

module.exports = new webpackConfig.Config()
  .extend(webpackBaseFile)
  .merge({
    devServer: {
      contentBase: buildPath,
      historyApiFallback: true,
      port: runPort
    },
    devtool: 'eval-source-map'
  });
