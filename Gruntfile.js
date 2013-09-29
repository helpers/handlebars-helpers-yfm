/*
 * yfm
 * https://github.com/assemble/yfm
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Report elapsed execution time of grunt tasks.
  require('time-grunt')(grunt);


  // Project configuration.
  grunt.initConfig({
    book: require('./test/fixtures/book/book.yml'),

    // Lint JavaScript
    jshint: {
      all: ['Gruntfile.js', 'helpers/*.js', 'lib/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    assemble: {
      options: {
        aggregate: {
          sep: '<!-- separator defined in Gruntfile -->',
          compare_fn: function(a, b) {
            return a.index >= b.index ? 1 : -1;
          }
        },
        flatten: true,
        layout: 'test/default.hbs',
        helpers: ['lib/*.js', 'helper-aggregate']
      },
      pages: {
        src: 'test/fixtures/*.hbs',
        dest: 'test/actual/'
      },
      book: {
        options: {
          aggregate: {
            compare_fn: function(a, b) {
              if(a.context.chapter === b.context.chapter) {
                return 0;
              } else if (a.context.chapter > b.context.chapter) {
                return 1;
              } else {
                return -1;
              }
            }
          },
          data: ['test/fixtures/book/book.yml'],
          layout: 'test/fixtures/book/book.hbs'
        },
        files: [
          { src: ['test/fixtures/book/*chapter-*.hbs', 'test/fixtures/book/toc.hbs'], dest: 'test/actual/book/' }
        ]
      }
    },

    // Run mocha tests.
    mochaTest: {
      files: ['test/**/*.js']
    },
    mochaTestConfig: {
      options: {
        reporter: 'nyan'
      }
    },

    // Before generating any new files,
    // remove files from previous build.
    clean: {
      example: ['docs/*.html']
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-sync-pkg');
  grunt.loadNpmTasks('assemble');

  // Tests to be run.
  grunt.registerTask('test', ['assemble', 'mochaTest']);

  // Default to tasks to run with the "grunt" command.
  grunt.registerTask('default', ['clean', 'jshint', 'test', 'sync']);
};
