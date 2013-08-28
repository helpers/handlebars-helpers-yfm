/*
 * yfm
 * https://github.com/assemble/yfm
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'helpers/*.js', 'lib/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    assemble: {
      options: {
        flatten: true,
        helpers: ['lib/yfm.js'],
      },
      pages: {
        src: 'test/fixtures/*.hbs',
        dest: 'test/actual/'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      example: ['docs/*.html']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('assemble');

  // Default to tasks to run with the "grunt" command.
  grunt.registerTask('default', ['clean', 'jshint', 'assemble']);
};
