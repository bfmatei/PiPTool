const webpack = require('webpack');
const webpackConfig = require('webpack-config');
const path = require('path');

const packageFile = require('./package.json');
const packageConfig = packageFile.pipToolConfig;

const {
  appFolderName,
  buildFileName,
  buildFolderName,
  entryFileName,
  entryDestFileName,
  globalDestFileName,
  globalFileName,
  globalPageName,
  imagesFolderName,
  metaFolderName,
  stylesFileName,
  stylesFolderName,
  targetModeCommand,
  targetModeIdentifier,
  targetModeImage,
  targetModeLabel,
  targetModePaletteLabel,
  targetModeTooltip
} = packageConfig;

const appPath = path.resolve(__dirname, `./${appFolderName}`);
const buildPath = path.resolve(__dirname, `./${buildFolderName}`);
const entryPath = path.resolve(appPath, `./${entryFileName}`);
const globalPath = path.resolve(appPath, `./${globalFileName}`);
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
const cleanBuildFolder = new CleanWebpackPlugin([
  buildFolderName
], {
  root: __dirname,
  verbose: false,
  dry: false
});

const ResourcesWebpackPlugin = require('./webpack.resources.plugin');

const replaceIndexValues = {
  globalDestFileName
};

const replaceMetaValues = {
  author: packageFile.author.name,
  description: packageFile.description,
  devKey: packageConfig.devKey,
  entryScriptPath: entryDestFileName,
  entryStylesPath: `${stylesFolderName}/${stylesFileName}`,
  globalPageName,
  globalScriptPath: globalDestFileName,
  packageIdentifier: packageConfig.packageIdentifier,
  targetModeCommand,
  targetModeIdentifier,
  targetModeImagePath: `${imagesFolderName}/${targetModeImage}`,
  targetModeLabel,
  targetModePaletteLabel,
  targetModeTooltip,
  updateUrl: packageConfig.updateUrl,
  version: packageFile.version
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
    dest: buildPath,
    replaceValues: replaceIndexValues
  }
]);

const entry = {};

entry[entryDestFileName] = entryPath;
entry[globalDestFileName] = globalPath;

module.exports = new webpackConfig.Config()
  .merge({
    entry,
    output: {
      path: buildPath,
      filename: '[name]'
    },
    // devtool: 'source-map',
    context: __dirname,
    resolve: {
      extensions: [
        '.ts',
        '.json'
      ],
      modules: [
        nodeModulesPath
      ]
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          exclude: [
            nodeModulesPath
          ],
          use: [
            {
              loader: 'ts-loader'
            },
            {
              loader: 'tslint-loader',
              options: {
                enforce: 'pre'
              }
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
