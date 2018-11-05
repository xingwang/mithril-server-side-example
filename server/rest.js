'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const authStrategy = require('./lib/auth');

app.use(bodyParser.json());
app.use(session({
  secret: process.env.API_SECRET,
  resave: true,
  saveUninitialized: true
}));
passport.use(authStrategy);
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
});

app.use(function(req, res, next){
  next();
});

app.post('/Login', passport.authenticate('basic'), function(req, res, next) {
  return res.json(req.user);
});

app.post('/View', passport.authenticate('basic'), function(req, res, next) {
  return res.status(200).json({a: 3});
});

module.exports = app;
