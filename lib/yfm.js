/*
 * yfm
 * https://github.com/assemble/yfm
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */


'use strict';

// Node.js modules
var path  = require('path');
var fs    = require('fs');


// node_modules
var grunt = require('grunt');
var glob  = require('globule');
var yfm   = require('assemble-yaml');
var _     = require('lodash');

// Local utils.
var Utils = require('./utils');



var processContext = function (grunt, context) {
  var config = _.cloneDeep(grunt.config.data);
  grunt.config.data = grunt.util._.defaults(context || {}, config);
  context = grunt.config.process(context);
  grunt.config.data = _.cloneDeep(config);
  return context;
};


module.exports.register = function(Handlebars, options) {

  // If the 'assemble.options' object exists, use it
  var assembleOptions = options || {};


  Handlebars.registerHelper('readYFM', function(context) {
    return Utils.getCurrentYFM(context);
  });

  /*
   * Glob YAML Front Matter
   */
  Handlebars.registerHelper("globYFM", function(context) {
    var content = Utils.globFrontMatter(context);
    return new Handlebars.SafeString(content);
  });

  /**
   * Parse YAML front matter
   * @param  {String} data    [path to the file with the YFM to be parsed]
   * @param  {Object} options [options to pass in]
   * @return {Object}         [description]
   */
  Handlebars.registerHelper("parseYFM", function(data, options) {
    options = options || {fromFile: true};
    var content = yfm.extract(data, options).context;
    return new Handlebars.SafeString(JSON.stringify(content, null, 2));
  });


  /**
   * Extract and convert front matter using https://github.com/assemble/assemble-front-matter
   * @param  {String} data    [path to the file with the YFM to be parsed]
   * @param  {Object} options [options to pass in]
   * @return {Object}         [description]
   */
  Handlebars.registerHelper("frontmatter", function(data, options) {
    var content = yfm.extractJSON(data);
    // return options.fn(content);
    content = JSON.stringify(content, null, 2);
    return new Handlebars.SafeString(content);
  });


  /**
   * Extract and convert front matter using https://github.com/assemble/assemble
   * @param  {String} data    [path to the file with the YFM to be parsed]
   * @param  {Object} options [options to pass in]
   * @return {Object}         [description]
   */
  Handlebars.registerHelper("yfm", function(data, options) {
    options = options || {fromFile: true};
    var content = yfm.extractJSON(data);
    return options.fn(content);
  });

  /**
   * Extract and convert front matter using https://github.com/assemble/assemble
   * @param  {String} data    [path to the file with the YFM to be parsed]
   * @param  {Object} options [options to pass in]
   * @return {Object}         [description]
   */
  Handlebars.registerHelper("yfmCompile", function (src, options) {
    options = options || {fromFile: true};
    var context = yfm.extract(src, options).context;
    var content = yfm.extract(src, options).content;
    var template = Handlebars.compile(content);
    return new Handlebars.SafeString(template(context));
  });

  /**
   * Extract and convert front matter using https://github.com/assemble/assemble
   * @param  {String} data    [path to the file with the YFM to be parsed]
   * @param  {Object} options [options to pass in]
   * @return {Object}         [description]
   */
  Handlebars.registerHelper("eachYFM", function(src, options) {
    options = options || {
      fromFile: true
    };
    return glob.find(src).map(function (path) {
      return yfm.extract(path, options).context;
    }).map(function (obj) {
      return options.fn(obj);
    }).join('');
  });


  /**
   * Extract and convert front matter using https://github.com/assemble/assemble
   * @param  {String} data    [path to the file with the YFM to be parsed]
   * @param  {Object} options [options to pass in]
   * @return {Object}         [description]
   */
  Handlebars.registerHelper("inline", function (src, options) {
    options = options || {
      fromFile: true
    };
    return glob.find(src, options).map(function (path, options) {
      return {
        context: yfm.extract(path, options).context,
        content: yfm.extract(path, options).content
      };
    }).map(function (obj) {
      obj.context = processContext(grunt, obj.context);
      var template = Handlebars.compile(obj.content);
      return new Handlebars.SafeString(template(obj.context));
    }).join('');
  });

};




