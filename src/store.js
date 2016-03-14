'use strict';

import initialData, {testData} from './data';

// global state
// *****************************************************************************
let state = initialData();

// action types
// *****************************************************************************
const types = {
	PRINTABLE: 'PRINTABLE',
	SORT: 'SORT',
	ADD_ITEM: 'ADD_ITEM',
	SET_ITEM_TEXT: 'SET_ITEM_TEXT',
	INCREMENT_VOTE: 'INCREMENT_VOTE',
	SET_VOTE: 'SET_VOTE',
	RESET: 'RESET'
};

// action creators
// *****************************************************************************
const actions = {
	printable: function () {
		return {type: types.PRINTABLE};
	},
	sort: function () {
		return {type: types.SORT};
	},
	addItem: function (payload) {
		return {type: types.ADD_ITEM, payload: payload};
	},
	setItemText: function (payload) {
		return {type: types.SET_ITEM_TEXT, payload: payload};
	},
	incrementVote: function (payload) {
		return {type: types.INCREMENT_VOTE, payload: payload};
	},
	setVote: function (payload) {
		return {type: types.SET_VOTE, payload: payload};
	},
	reset: function (payload) {
		return {type: types.RESET, payload: payload === undefined ? null : payload};
	}
};

// getState
// *****************************************************************************
function getState() {
	return state;
}

// dispatcher
// *****************************************************************************
function dispatch(action) {
	switch (action.type) {
		case types.PRINTABLE:
			return printable();
		case types.SORT:
			return sortList();
		case types.SET_ITEM_TEXT:
			return setItemText(action.payload);
		case types.INCREMENT_VOTE:
			return incrementVote(action.payload);
		case types.SET_VOTE:
			return setVote(action.payload);
		case types.ADD_ITEM:
			return addItem(action.payload);
		case types.RESET:
			return reset(action.payload);
		default:
			return state;
	}
}

// transforms
// *****************************************************************************
function printable() {
	state.isPrintable = true;
	return state;
}

function sortList(data) {
	const arr = state.bad.slice(0);
	arr.sort((a, b) => {
		return a.vote - b.vote;
	});
	state.bad = arr;
	return state;
}

function setItemText(payload) {
	state[payload.id][payload.idx].text = payload.text;
	return state;
}

function incrementVote(payload) {
	const item = state.bad[payload.idx];
	item.vote += 1;
	return state;
}

function setVote(payload) {
	state[payload.id][payload.idx].vote = Math.max(payload.vote, 0);
	return state;
}

function reset(data) {
	state = data === null ? initialData() : data;
	return state;
}

function addItem(payload) {
	state[payload.id] = state[payload.id].concat({
		text: payload.text || null,
		vote: payload.vote === undefined ? null : payload.vote
	});
	return state;
}

// *****************************************************************************
const store = {
	dispatch: dispatch,
	getState: getState
};

// *****************************************************************************
export {actions, store};
