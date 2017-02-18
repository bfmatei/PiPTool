const fs = require('fs-extra');
const path = require('path');

/**
 * ResourcesWebpackPlugin minify flags
 * @typedef {Function} ResourcesWebpackPlugin~TransformCallback
 * @param {String} data - Content of current file
 */

/**
 * ResourcesWebpackPlugin entry
 * @typedef {Object} ResourcesWebpackPlugin~Entry
 * @property {String} path - Source folder path
 * @property {RegExp} filePattern - Pattern to match the files
 * @property {String} dest - Dest folder path
 * @property {ResourcesWebpackPlugin~TransformCallback} [transform] - A transform callback for content
 * @property {Object} [replaceValues] - Values for keys to be replaced
 */
class ResourcesWebpackPlugin {
  /**
   * Instantiate ResourcesWebpackPlugin
   * @param {ResourcesWebpackPlugin~Entry[]} entries - Array containing the entries
   */
  constructor(entries) {
    this.entries = entries;
  }

  /**
   * Replace value for pattern
   * @param {String} match - Current found pattern
   * @param {String} key - Current found key
   * @return {String} - Value for current key
   */
  static replaceValuesCaller(match, key) {
    return this[key];
  }

  /**
   * Test each file for pattern
   * @param {String} file - Current file to test
   * @return {Boolean} - Flag for current file
   */
  static filterFiles(file) {
    return this.filePattern.test(file);
  }

  /**
   * Write file to the disk
   * @param {String} target - Destination path
   * @param {String} data - Content of destionation file
   */
  static writeFile(target, data) {
    /** Write file */
    fs.outputFile(target, data, (writeError) => {
      if (writeError) {
        /** Throw write error */
        console.error(`ResourcesWebpackPlugin: file '${target}' could not be written`);

        throw new Error(writeError);
      }
    });
  }

  /**
   * Read, replace if necessary and write target file
   * @param {String} source - Path of source file
   * @param {String} target - Path of target file
   * @param {ResourcesWebpackPlugin~TransformCallback} transform - A transform callback for content
   * @param {Object} replaceValues - Values for the replace keys
   */
  static parseFile(source, target, transform, replaceValues) {
    /** Read file */
    fs.readFile(source, (readError, data) => {
      if (readError) {
        /** Throw read error */
        console.error(`ResourcesWebpackPlugin: file '${source}' could not be read`);

        throw new Error(readError);
      }

      /** Convert data to string */
      data = data.toString();

      if (0 < Object.keys(replaceValues).length) {
        /** Replace content */
        data = data.replace(/\{\{(.*)}}/g, ResourcesWebpackPlugin.replaceValuesCaller.bind(replaceValues));
      }

      if (transform) {
        data = transform(data);
      }

      ResourcesWebpackPlugin.writeFile(target, data);
    });
  }

  /**
   * Read current entry
   * @param {ResourcesWebpackPlugin~Entry} entry - Current entry
   */
  static readEntry(entry) {
    /** Read the folder structure */
    let files = fs.readdirSync(entry.path);

    /** Filter the files by file pattern */
    files = files.filter(ResourcesWebpackPlugin.filterFiles.bind(entry));

    /** Go through each file */
    files.forEach((file) => {
      const filePath = path.resolve(entry.path, file);
      const fileDestPath = path.resolve(entry.dest, file);

      ResourcesWebpackPlugin.parseFile(filePath, fileDestPath, entry.transform || null, entry.replaceValues || {});
    });
  }
}

/**
 * Bind the apply method for Webpack
 * @param {Object} compiler - Webpack compiler instance
 */
ResourcesWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', (compilation, callback) => {
    /** Parse each entry */
    this.entries.forEach(ResourcesWebpackPlugin.readEntry);

    if (callback) {
      callback();
    }
  });
};

module.exports = ResourcesWebpackPlugin;
