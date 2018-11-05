'use strict';
const model = {
  email: undefined,
  message: undefined,
  action: undefined,
  selectOptions: ['', 'A', 'B', 'C'],
  setValue: (key) => (value) => {
    model[key] = value;
  },
  setRadio: (key, value) => () => {
    model[key] = value;
  },
  setSelect: (key) => (index) => {
    if (index === 0) {
      index++;
    }
    model[key] = model.selectOptions[index];
  },
  userId: undefined,
};

module.exports = model;
