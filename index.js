'use strict';
require('mithril/test-utils/browserMock')(global);
global.window.XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const web = require('./server/web');
const rest = require('./server/rest');
const compression = require('compression');
const browserify = require('browserify-middleware');
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(web);
app.use('/api', rest);
app.get('/index.js', browserify('./client/index.js'));

app.listen(process.env.PORT, function () {
  console.log(`Server started on port ${process.env.PORT}!`);
});
