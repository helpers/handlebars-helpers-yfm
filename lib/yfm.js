(function() {
  module.exports.register = function(Handlebars, options) {

    var assemble = require('assemble');
    var grunt    = require('grunt');
    var path     = require('path');
    var fs       = require('fs');
    var _        = grunt.util._;


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


    Handlebars.registerHelper("yfm", function(data, options) {
      var content = assemble.data.readYFM(data, {fromFile: true}).context;
      return options.fn(content);
      // content = JSON.stringify(content, null, 2);
      // return new Handlebars.SafeString(content);
    });


  };
}).call(this);
