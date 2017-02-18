const webpack = require('webpack');
const webpackConfig = require('webpack-config');
const path = require('path');

const packageFile = require('./package.json');
const packageConfig = packageFile.pipToolConfig;

const {
  appFileName,
  appFolderName,
  buildFileName,
  buildFolderName,
  imagesFolderName,
  metaFolderName,
  stylesFolderName
} = packageConfig;

const appPath = path.resolve(__dirname, `./${appFolderName}`);
const buildPath = path.resolve(__dirname, `./${buildFolderName}`);
const entryPath = path.resolve(appPath, `./${appFileName}`);
const imagesPath = path.resolve(appPath, `./${imagesFolderName}`);
const imagesDestPath = path.resolve(buildPath, `./${imagesFolderName}`);
const metaPath = path.resolve(appPath, `./${metaFolderName}`);
const metaDestPath = buildPath;
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const stylesPath = path.resolve(appPath, `./${stylesFolderName}`);
const stylesDestPath = path.resolve(buildPath, `./${stylesFolderName}`);

const loaderOptions = new webpack.LoaderOptionsPlugin({
  minimize: true,
  debug: false,
  options: {
    context: __dirname,
    output: {
      path: buildPath,
      filename: buildFileName
    }
  }
});

const CleanWebpackPlugin = require('clean-webpack-plugin');
const cleanBuildFolder = new CleanWebpackPlugin([buildFolderName], {
  root: __dirname,
  verbose: false,
  dry: false
});

const ResourcesWebpackPlugin = require('./webpack.resources.plugin');

const replaceMetaValues = {
  author: packageFile.author.name,
  packageIdentifier: packageConfig.packageIdentifier,
  version: packageFile.version,
  description: packageFile.description,
  devKey: packageConfig.devKey,
  updateUrl: packageConfig.updateUrl
};

const copyResources = new ResourcesWebpackPlugin([
  {
    path: imagesPath,
    filePattern: /(.*)\.(svg|png)/,
    dest: imagesDestPath
  },
  {
    path: metaPath,
    filePattern: /(.*).plist/,
    dest: metaDestPath,
    replaceValues: replaceMetaValues
  },
  {
    path: metaPath,
    filePattern: /(.*).json/,
    dest: metaDestPath,
    replaceValues: replaceMetaValues
  },
  {
    path: stylesPath,
    filePattern: /main\.css/,
    dest: stylesDestPath
  },
  {
    path: appPath,
    filePattern: /index\.html/,
    dest: buildPath
  }
]);

module.exports = new webpackConfig.Config()
  .merge({
    entry: entryPath,
    output: {
      path: buildPath,
      filename: buildFileName
    },
    context: __dirname,
    resolve: {
      extensions: [
        '.js',
        '.json'
      ],
      modules: [
        nodeModulesPath
      ]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: [
            nodeModulesPath
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            },
            {
              loader: 'eslint-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      cleanBuildFolder,
      loaderOptions,
      copyResources
    ]
  });
