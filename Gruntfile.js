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
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },
    watch: {
      all: {
        files: ['<%= jshint.all %>'],
        tasks: ['jshint', 'nodeunit'],
        options: {interrupt: true}
      }
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    forever: {
      options: {
        index: './test/fixtures/index.js'
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // By default, lint and run all tests.
  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
  
};