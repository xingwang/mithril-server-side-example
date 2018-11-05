'use strict';
const model = {
  email: undefined,
  password: undefined,
  message: undefined,
  setValue: (key) => (value) => {
    model[key] = value;
  }
};

module.exports = model;
