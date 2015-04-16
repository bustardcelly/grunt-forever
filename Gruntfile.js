/*
 * grunt-forever
 * https://github.com/bustardcelly/grunt-forever
 *
 * Copyright (c) 2013 Todd Anderson
 * Licensed under the MIT license.
 * https://github.com/bustardcelly/grunt-forever/blob/master/LICENSE-MIT
 */
/*global module:false*/
module.exports = function(grunt) {

  'use strict';
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        node: true
      }
    },
    watch: {
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint'],
        options: {
          interrupt: true
        }
      }
    },
    forever: {
      test: {
        options: {
          index: __dirname + '/test/fixtures/index.js'
        }
      },
      test2: {
        options: {
          index: __dirname + '/test/fixtures/index2.js'
        }
      },
      testLog: {
        options: {
          index: __dirname + '/test/fixtures/index.js',
          logDir: 'forever',
          logFile: 'loggy.txt'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

};
