module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'tasks/*.js', 'test/spec/*.spec.js']
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },
    jasmine_node: {
      spec: "./test/spec",
      projectRoot: ".",
      requirejs: false,
      forceExit: true,
      jUnit: {
        report: false,
        savePath : "./build/reports/jasmine/",
        useDotNotation: true,
        consolidate: true
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-jasmine-node');
  
  grunt.registerTask('default', 'lint jasmine_node');
  
};