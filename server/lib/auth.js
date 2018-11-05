'use strict';
const BasicStrategy = require('passport-http').BasicStrategy;
const request = require('request');
const apiBase = process.env.API_BASE;
const _ = require('lodash');

module.exports = new BasicStrategy(
  function(email, password, done) {
    const options = {
      method: 'POST',
      url: `${apiBase}/tokens`,
      body: {
        email: email,
        password: password
      },
      json: true
    };

    //make request to auth user
    const user = {
      _id: 123,
      token: 'someToken'
    };

    return done(null, user);
  }
);
