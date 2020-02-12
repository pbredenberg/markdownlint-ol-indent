'use strict';

const { addErrorDetailIf, indentFor, orderedListItemMarkerRe, flattenLists } =
  require('markdownlint-rule-helpers');

const { URL } = require('url');

module.exports = {
   'names': [ 'ol-indent' ],
   'description': 'Ordered list indentation',
   'information': new URL('https://example.com/rules/any-blockquote'),
   'tags': [ 'ol', 'indentation' ],
   'function': (params, onError) => {
      const indent = Number(params.config.indent || 2),
            startIndented = params.config.start_indented;

      flattenLists(params).forEach((list) => {
         if (list.ordered && list.parentsOrdered) {
            list.items.forEach((item) => {
               // The below logic is essentially the same as the rule for checking
               // indentation in unordered lists. If this rule is eventually integrated
               // into markdownlint, it would make sense to add the below to a helper
               // function that both can use.
               // See: https://github.com/DavidAnson/markdownlint/blob/master/lib/md007.js#L17
               const { lineNumber, line } = item,
                     expectedNesting = list.nesting + (startIndented ? 1 : 0),
                     expectedIndent = expectedNesting * indent,
                     actualIndent = indentFor(item),
                     match = line.match(orderedListItemMarkerRe);

               let range = null,
                   editColumn = 1;

               if (match) {
                  range = [ 1, match[0].length ];
                  editColumn += match[1].length - actualIndent;
               }

               addErrorDetailIf(onError, lineNumber, expectedIndent, actualIndent, null, null, range, {
                  editColumn,
                  'deleteCount': actualIndent,
                  'insertText': ''.padEnd(expectedIndent),
               });
            });
         }
      });
   },
};
