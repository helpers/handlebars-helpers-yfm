var assemble = require('assemble');
var grunt    = require('grunt');
var path     = require('path');
var fs       = require('fs');
var _        = grunt.util._;


// The module to be exported.
var Utils = module.exports = exports = {}

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
},

/*
 * Returns front matter from files expanded from globbing patterns.
 * can be used with a single file or many.
 */
Utils.globFrontMatter = function(src) {
  var content = void 0;
  return content = grunt.file.expand(src).map(function(path) {
    return {
      content: assemble.data.readYFM(path, {fromFile: true}).context
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
  var data = assemble.data.readYFM(path, {fromFile: true}).context
  return options.fn(JSON.parse(data));
};