'use strict';

const markdownlint = require('markdownlint'),
      olIndent = require('./ol-indent');

const options = {
   // TODO: Decide how we're going to declare configuration for markdownlint. For now,
   // we're reading it in via the JSON config for simplicity.
   // eslint-disable-next-line no-sync
   config: markdownlint.readConfigSync('.markdownlint.json'),
   files: [ 'README.md' ],
   customRules: [ olIndent ],
};

// Makes an asynchronous call
markdownlint(options, function callback(err, output) {
   if (!err) {
      console.log(output.toString()); // eslint-disable-line
   }
});
