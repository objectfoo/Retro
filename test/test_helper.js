import jsdom from 'jsdom';
// import chai from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';


const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

// setup test environment to look like browser
global.document = doc;
global.window = win;

const storectx = require('../src/store');
global.types = storectx.types;
global.actions = storectx.actions;
global.store = storectx.store;

global.React = React;
global.ReactDOM = ReactDOM;

// requires React
const AppCtx = require('../src/Components/App');
global.App = AppCtx.App;

Object.keys(window).forEach((key) => {
	if (!(key in global)) {
		global[key] = window[key];
	}
});

// chai.use(...);
