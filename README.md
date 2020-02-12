# markdownlint ol-indent custom rule

[![Build
Status](https://api.travis-ci.com/pbredenberg/markdownlint-ol-indent.svg?branch=master)](https://travis-ci.com/pbredenberg/markdownlint-ol-indent)

## What

This rule follows the pattern of Markdownlint's
[ul-indent](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md007---unordered-list-indentation)
to provide indentation checking for ordered lists.

## Why?

Markdownlint currently does no linting for ordered list indentation.

## Usage

Include this rule in your configuration's customRules[] configuration array.

```javascript
olIndent = require('/path/to/ol-indent');

const options = {
   config: {
      // Your configuration options go here.
   },
   files: [
      // References to your Markdown files go here.
   ],
   customRules: [ olIndent ],
};
```
