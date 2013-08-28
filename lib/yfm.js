(function() {
  module.exports.register = function(Handlebars, options) {

    var frontMatter = require('assemble-front-matter');
    var assemble    = require('assemble');
    var grunt       = require('grunt');
    var path        = require('path');
    var fs          = require('fs');
    var _           = grunt.util._;


    // Local utils.
    var Utils    = require('./utils');


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
      var content = assemble.data.readYFM(data, {fromFile: true}).context;
      return new Handlebars.SafeString(JSON.stringify(content, null, 2));
    });


    /**
     * Extract and convert front matter using https://github.com/assemble/assemble-front-matter
     * @param  {String} data    [path to the file with the YFM to be parsed]
     * @param  {Object} options [options to pass in]
     * @return {Object}         [description]
     */
    Handlebars.registerHelper("frontmatter", function(data, options) {
      var content = frontMatter.extract(data);
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
      var content = assemble.data.readYFM(data, {fromFile: true}).context;
      return options.fn(content);
    });

  };
}).call(this);
