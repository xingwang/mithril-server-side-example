'use strict'

const express = require('express');
const routes = require('../client/routes');
const toHtml = require('mithril-node-render');
const m = require('mithril');

const app = express();

Object.keys(routes).map(function (route) {
  let module = routes[route];
  let onmatch = module.onmatch || (() => module);
  let render = module.render || (a => a);

  app.get(route, function (req, res, next) {
    res.type('html');
    Promise.resolve()
      .then(() => m(onmatch(req.params, req.url) || 'div', req.params))
      .then(render)
      .then(toHtml)
      .then(res.send.bind(res))
      .catch(next);
  })
});

module.exports = app;
