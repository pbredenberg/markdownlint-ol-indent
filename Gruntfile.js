'use strict';

const markdownlint = require('markdownlint');

// TODO: Decide how we're going to declare configuration for markdownlint. For now,
// we're reading it in via the JSON config for simplicity.
// eslint-disable-next-line no-sync
let markdownlintConfig = markdownlint.readConfigSync('.markdownlint.json');

module.exports = function wrapper(grunt) {
   let config;

   config = {
      js: {
         gruntFile: 'Gruntfile.js',
         all: [
            './*.js',
         ],
      },
   };

   grunt.initConfig({

      eslint: {
         target: [ ...config.js.all ],
      },

      markdownlint: {
         lint: {
            options: {
               config: markdownlintConfig,
            },
            src: [ 'README.md' ],
         },
      },
   });

   grunt.loadNpmTasks('grunt-eslint');
   grunt.loadNpmTasks('grunt-markdownlint');

   grunt.registerTask('standards', [ 'eslint', 'markdownlint:lint' ]);
   grunt.registerTask('default', [ 'standards' ]);
};
