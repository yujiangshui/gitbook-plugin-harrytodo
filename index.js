'use strict';
var cheerio = require('cheerio');
var _ = require('underscore');
var re = /^\s*\[[x ]\]\s*/;
var replacements = {
  '[ ]': '<input type="checkbox" disabled="disabled"></i> ',
  '[x]': '<input type="checkbox" disabled="disabled" checked="checked"></i> ',
};

module.exports = {
  hooks: {
    page: function(page) {
      var $ = cheerio.load(page.content);
      $('li').each(function(index, a) {
        a = $(a);
        var text = a.text();
        var html = a.html();
        var result = re.exec(text);
        if (result !== null && result.index === 0) {
          a.html(html.replace(result[0], replacements[result[0].trim()]));
        }
      });
      page.content = $.html();

      return page;
    },
  },
};
