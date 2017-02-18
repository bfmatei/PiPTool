const webpackConfig = require('webpack-config');

const packageFile = require('./package.json');
const config = packageFile.pipToolConfig;

const {
  webpackBaseFile
} = config;

module.exports = new webpackConfig.Config()
  .extend(webpackBaseFile)
  .merge({
    watch: true,
    devtool: 'eval-source-map'
  });
