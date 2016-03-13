(function (global) {
	const Retrospective = global.Retrospective = global.Retrospective || {};

	// Initial State
	const initialState = {
		isSorted: false,
		good: [],
		bad: [],
		next: []
	};

	let state = initialState;

	// Action Types
	Retrospective.types = {
		SORT: 'SORT',
		ADD_ITEM: 'ADD_ITEM',
		INCREMENT_VOTE: 'INCREMENT_VOTE',
		RESET: 'RESET',
		SET_ITEM_TEXT: 'SET_ITEM_TEXT'
	};

	// Action creators
	Retrospective.actions = {
		sort: function sort(data) {
			return {
				type: Retrospective.types.SORT,
				value: data
			};
		},

		addItem: function addItem(data) {
			return {
				type: Retrospective.types.ADD_ITEM,
				data: data
			};
		},

		setItemText: function (data) {
			return {
				type: Retrospective.types.SET_ITEM_TEXT,
				data: data
			};
		},

		incrementVote: function incrementVote(data) {
			return {
				type: Retrospective.types.INCREMENT_VOTE,
				data: data
			};
		},

		reset: function reset(data) {
			return {
				type: Retrospective.types.RESET
			};
		}
	};

	// Store
	Retrospective.store = {
		getState: function () {
			return state;
		},

		dispatch: function (action) {
			state = reduce(state, action);
		}
	};

	// Reducer
	function reduce(state, action) {
		switch (action.type) {
			case Retrospective.types.RESET:
				return reset();
			case Retrospective.types.ADD_ITEM:
				return addItem(state, action.data);
			case Retrospective.types.SET_ITEM_TEXT:
				return setItemText(state, action.data);
			case Retrospective.types.INCREMENT_VOTE:
				return incrementVote(state, action.data);
			default:
				console.log('warning unknown action', action.type);
				return state;
		}
		// emit new state message
	}

	// state transforms
	// function sortList(data) {
	// 	// hardcode data.listide
	// 	// sort list
	// 	// set sorted flag
	// 	console.log('transform::sortList()', data);
	// }
	function reset() {
		const newState = Object.assign({}, initialState);
		return newState;
	}

	function incrementVote(state, data) {
		console.log('voting');
		return state;
	}

	function setItemText(state, data) {
		const list = data.id;
		const newText = data.text;
		const idx = data.idx;
		const newState = Object.assign({}, state);

		newState[list][idx].text = newText;
		return newState;
	}

	function addItem(state, data) {
		const text = data.text;
		const list = data.id;

		const newState = Object.assign({}, state);

		newState[list] = newState[list].concat({
			text: text
		});

		return newState;
	}

	if (typeof module !== 'undefined') {
		module.exports = {
			store: Retrospective.store,
			types: Retrospective.types,
			actions: Retrospective.actions
		};
		module.exports = Retrospective;
	}
})(typeof global === 'undefined' ? window : global);
