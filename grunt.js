module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    test: {
      files: ['test/*_test.js']
    },
    lint: {
      all: ['grunt.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
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
    forever: {
      main: './test/fixtures/index.js'
    }
  });

  grunt.loadTasks('tasks');
  grunt.registerTask('default', 'lint test');

  grunt.registerHelper('forever', function(operation) {
    grunt.task.run('forever:' + operation);
  });

};