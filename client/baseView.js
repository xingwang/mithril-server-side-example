'use strict'

const m = require('mithril');
const styler = require('mithril-j2c');

const getTitle = (vnode) => {
  if (vnode.state.getTitle) {
    return vnode.state.getTitle();
  }
  return 'Mini Accounts';
};

module.exports = function (view) {
  if (process.browser) {
    return function (vnode) {
      document.title = getTitle(vnode);

      return view(vnode);
    };
  }

  return function (vnode) {
    return [
      m('!doctype[html]'),
      m('html[lang=en]', [
        m('head', [
          m('title', getTitle(vnode)),
          m('meta[charset=utf-8]'),
          m('script[src=/index.js]')
        ])
      ]),
      m('body', view(vnode))
    ];
  };
};
