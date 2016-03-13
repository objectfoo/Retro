import jsdom from 'jsdom';
import chai from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// setup test environment to look like browser
global.document = doc;
global.window = win;

// wire exported module to global context
const store = require('../src/store');
global.types = store.types;
global.actions = store.actions;
global.store = store.store;

global.React = React;
global.ReactDOM = ReactDOM;

// App requires React
global.App = require('../src/Components/App').App;

Object.keys(window).forEach(key => {
	if (!(key in global)) {
		global[key] = window[key];
	}
});

// chai.use(...);
