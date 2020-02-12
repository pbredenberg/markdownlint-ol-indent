'use strict';

const { addErrorDetailIf, indentFor, orderedListItemMarkerRe } =
  require('./node_modules/markdownlint/helpers');

const parseList = (params, list, onError) => {
   if (list.ordered && list.parentsOrdered) {
      const indent = Number(params.config.indent || 2);

      const startIndented = params.config.start_indented;

      list.items.forEach((item) => {
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
};

module.exports = {
   'names': [ 'ol-indent' ],
   'description': 'Ordered list indentation',
   'information': new URL('https://example.com/rules/any-blockquote'),
   'tags': [ 'ol', 'indentation' ],
   'function': function MD008(params, onError) {
      params.tokens.forEach((token) => {
         console.log('token', token); // eslint-disable-line
         return parseList(params, token, onError);
      });
   },
};
