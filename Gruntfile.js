'use strict';

const markdownlint = require('markdownlint');

module.exports = function wrapper(grunt) {
   let config;

   config = {
      js: {
         gruntFile: 'Gruntfile.js',
         all: [
            './ol-indent.js',
         ],
      },
   };

   grunt.initConfig({

      eslint: {
         target: [ ...config.js.all ],
      },

      markdownlint: {
         example: {
            src: [ 'README.md' ],
         },
      },
   });

   grunt.loadNpmTasks('grunt-eslint');

   grunt.registerMultiTask('markdownlint', function task() {
      const done = this.async();

      markdownlint({ 'files': this.filesSrc }, function callback(err, result) {
         const resultString = err || ((result || '').toString());

         if (resultString) {
            grunt.fail.warn('\n' + resultString + '\n');
         }
         done(!err || !resultString);
      });
   });

   grunt.registerTask('standards', [ 'eslint' ]);
   grunt.registerTask('default', [ 'standards' ]);
};
