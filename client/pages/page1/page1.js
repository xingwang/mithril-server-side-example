'use strict'

const m = require('mithril');
const apiUrl = '/api/';
const baseView = require('../../baseView');
const _ = require('lodash');
const model = require('../../models/page1Model');
const styler = require('mithril-j2c');

const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userId');
  m.route.set('/');
};

const isAuthenticated = () => {
  if (_.isEmpty(sessionStorage)) {
    return false;
  }

  const session = sessionStorage.getItem('userId');
  const token = sessionStorage.getItem('token');

  return (session && token);
};

const oninit = (vnode) => {
  vnode.state.model = model;
  vnode.state.model.action = 'View';
  vnode.state.model.status = '';
};

const oncreate = (vnode) => {
  if (!isAuthenticated()) {
    logout();
  }
};

const doStuff = (vnode) => () => {
  const options = {
    method: 'POST',
    url: apiUrl + vnode.state.model.action,
    data: vnode.state.model
  };

  return m.request(options).then(function (result) {
    //do stuff
  }).catch((err) => {
    vnode.state.model.message = err.toString();
    clear(vnode)();
  });
};

const view = (vnode) => {
  const buttonStyle = styler.liveUpdate({
    '.button': {
      'font-size': '15px'
    }
  });

  const view = [
    m('h1', 'TITLE'),
    m('div', [
      m('button.' + buttonStyle.button, {type: 'button', onclick: logout}, 'Logout')
    ]),
    m('p', 'Please enter the required information.'),
    m('div', {style: 'width: 30%'},
      m('form', {id: 'blockForm', method: 'POST'}, [
        m('table', {width: '100%'},[
          m('col', {width: '35%'}),
          m('col', {width: '65%'}),
          m('tr', [
            m('td', m('span', 'Action:')),
            m('td', [
              m('label', {for: 'view'}, 'View'),
              m("input", {id: 'view', type: 'radio', name: 'action', onclick: m.withAttr("value", model.setRadio('action', 'View')), checked: model.action === 'View'})
            ])
          ]),
          m('tr', [
            m('td', m('label', {for: 'email'}, 'Email (required):')),
            m('td', m('input[required]', {id: 'email', name: 'email', type: 'email', oninput: m.withAttr("value", model.setValue('email')), value: model.email}))
          ]),
          m('tr', [
            m('td', m('label', {for: 'status'}, `Status${model.action === 'Block' ? ' (required)': ''}:`)),
            m('td', m('select', {id: 'status', onclick: m.withAttr('selectedIndex', model.setSelect('status'))}, [
              model.selectOptions.map(function(option) {
                return m('option', {selected: option === model.status}, option);
              })
            ]))
          ]),
          m('tr', [
            m('td', m('button.' + buttonStyle.button, {type: 'button', onclick: doStuff(vnode)}, vnode.state.model.action))
          ])
        ])
      ]),
      m('div',
        vnode.state.model.message ? m('p', vnode.state.model.message) : m('p', `Please fill out the form and click the button.`)
      ),
    ),
    styler.view()
  ];

  return view;
};

module.exports = {
  oninit: oninit,
  oncreate: oncreate,
  view: baseView(view)
};
