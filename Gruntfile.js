/*
 * holy-boilerplate
 *
 * Copyright (c) 2013 George Pantazis
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var jadeconfig = {

    pretty: true,

    data: {

      partial: function(templatePath, dataObj){
        var template = grunt.file.read(templatePath);

        if (typeof(dataObj) === String) {
          dataObj = grunt.file.readJSON(dataObj);
        }

        if(templatePath.match(/.jade/g)){
          return require('grunt-contrib-jade/node_modules/jade').compile(template, {filename: templatePath})(dataObj);
        } else {
          return template;
        }
      },

      data: function(path){
        return grunt.file.readJSON(path);
      },

      locals: {
        data: function(path){
          return jadeconfig.data.data(path);
        },
        partial: function(templatePath, dataObj){
          return jadeconfig.data.partial(templatePath, dataObj);
        }
      }
    }
  };

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
      common:{
        options: jadeconfig,
        files: [
          {
            expand: true,
            cwd: 'src/pages',
            src: ['**/*.jade'],
            dest: 'build/',
            ext: '.html'
          }
        ]
      },
      modules:{
        options: jadeconfig,
        files: [
          {
            expand: true,
            cwd: 'src/modules',
            src: ['**/html/**/*-demo.jade'],
            dest: 'build/demos/',
            ext: '.html',
            flatten: true
          }
        ]
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      build: ['build']
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

  grunt.registerTask('test', ['default']);
  grunt.registerTask('default', ['clean', 'jshint', 'jade']);
};
