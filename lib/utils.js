/*
 * yfm
 * https://github.com/assemble/yfm
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */


var assemble = require('assemble');
var grunt    = require('grunt');
var path     = require('path');
var fs       = require('fs');
var _        = grunt.util._;


// The module to be exported.
var Utils = module.exports = exports = {};

/**
 * Accepts two objects (a, b),
 * @param  {Object} a
 * @param  {Object} b
 * @return {Number} returns 1 if (a >= b), otherwise -1
 */
Utils.compareFn = function(a, b) {
  return a.index >= b.index ? 1 : -1;
}


/**
 * This helper is meant to be instructive. You can add additional
 * properties to the content object to return whatever data you need.
 * @param  {[type]} src [description]
 * @return {[type]}     [description]
 */
Utils.globBasenames = function(src) {
  var content = void 0;
  return content = grunt.file.expand(src).map(function(path) {
    return {
      path: path
    };
  }).map(function(obj) {
    return path.basename(obj.path);
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};

/*
 * Returns front matter from files expanded from globbing patterns.
 * can be used with a single file or many.
 */
Utils.globFrontMatter = function(src, options) {
  options = options || {fromFile: true};
  var content = void 0;
  return content = grunt.file.expand(src).map(function(path) {
    return {
      content: assemble.data.readYFM(path, options).context
    };
  }).map(function(obj) {
    return JSON.stringify(obj.content, null, 2);
  }).join(grunt.util.normalizelf(grunt.util.linefeed));
};


Utils.getCurrentYFM = function(src) {
  var content = assemble.data.readYFM(path, {fromFile: true}).context;
  return JSON.stringify(content, null, 2);
};

Utils.parseYFM = function(options) {
  var data = assemble.data.readYFM(path, {fromFile: true}).context;
  return options.fn(JSON.parse(data));
};