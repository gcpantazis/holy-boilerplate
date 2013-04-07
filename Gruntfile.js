/*
 * holy-boilerplate
 *
 * Copyright (c) 2013 George Pantazis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jade:{
      docs:{
        options: {
          pretty: true
        },
        files: [
          {expand:true, cwd:'src/html/pages', src:['**/*.jade'], dest:'build/', ext:'.html'}
        ]
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['build']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-doccoh');

  grunt.registerTask('test', ['clean', 'jshint']);
  grunt.registerTask('default', ['clean', 'jshint']);
};
