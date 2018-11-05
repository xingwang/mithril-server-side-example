'use strict'

const m = require('mithril');
const apiUrl = '/api/';
const baseView = require('../../baseView');
const _ = require('lodash');
const model = require('../../models/loginModel');
const styler = require('mithril-j2c');
const snow = require('./snow');

const getSeason = () => {
  const month = new Date().getMonth();

  if (month < 3 || month === 11) {
    snow();
  }
};

const oninit = (vnode) => {
  vnode.state.model = model;
};

const oncreate = (vnode) => {
  getSeason();
};

const logIn = (vnode) => () => {
  if (_.isEmpty(vnode.state.model.email) || _.isEmpty(vnode.state.model.password)) {
    vnode.state.model.message = 'Error: Invalid email/password.';
    return;
  }

  const options = {
    method: 'POST',
    url: apiUrl + 'Login',
    user: vnode.state.model.email,
    password: vnode.state.model.password,
    withCredentials: true
  };

  return m.request(options).then(function (result) {
    sessionStorage.setItem('token', result.token);
    sessionStorage.setItem('userId', result._id);
    m.route.set('/page1');
  }).catch((err) => {
    vnode.state.model.message = err.toString();
  });
};

const submit = (vnode) => (e) => {
  if (e.keyCode === 13) {
    logIn(vnode)();
  }
};

const view = (vnode) => {
  const buttonStyle = styler.liveUpdate({
    '.button': {
      'font-size': '15px'
    }
  });
  const loginStyle = styler.liveUpdate({
    '.body': {
      position: 'absolute',
      'background-color':'hsla(255, 255%, 255%, .1)',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)',
      margin: 0
    }
  });
  const view = [
    m('canvas', {id: 'canv'}),
    m('div.' + loginStyle.body, [
      m('h1', 'Some Title'),
      m('p', 'Please enter your login information.'),
      m('div',
        m('form', {id: 'loginForm', method: 'POST'}, [
          m('table', [
            m('col', {width: '35%'}),
            m('col', {width: '65%'}),
            m('tr', [
              m('td', m('label', {for: 'email'}, 'Email:')),
              m('td', m('input[required]', {id: 'email', name: 'email', type: 'email', onkeydown: submit(vnode), oninput: m.withAttr("value", model.setValue('email')), value: model.email}))
            ]),
            m('tr', [
              m('td', m('label', {for: 'password'}, 'Password:')),
              m('td', m('input[required]', {id: 'password', name: 'password', type: 'password', onkeydown: submit(vnode), oninput: m.withAttr("value", model.setValue('password')), value: model.password}))
            ]),
          ]),
          m('div', [
            m('button.' + buttonStyle.button, {type: 'button', onclick: logIn(vnode) }, 'Login')
          ])
        ])
      ),
      m('div',
        vnode.state.model.message ? m('p', vnode.state.model.message) : m('p', `Please fill out the form and click \"Login\".`)
      )
    ]),
    styler.view()
  ];

  return view;
};

module.exports = {
  oninit: oninit,
  oncreate: oncreate,
  view: baseView(view)
};
