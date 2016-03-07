(function(global) {
	global.Retrospective = global.Retrospective || {};
	// var Retrospective = global.Retrospective || {};

	// Initial State
	var initialState = {
		isSorted: false,
		good: [],
		bad: [],
		next: []
	};

	var state = initialState;

	// Action Types
	Retrospective.types = {
		SORT: 'SORT',
		ADD_ITEM: 'ADD_ITEM',
		INCREMENT_VOTE: 'INCREMENT_VOTE',
		RESET: 'RESET'
	};

	// Action creators
	var actions = Retrospective.actions = {
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
		getState: function() { return state; },
		dispatch: function(action) {
			state = reduce(state, action);
		}
	};

	// Reducer
	function reduce(state, action) {

		switch (action.type) {
			// case Retrospective.types.SORT:
			// 	sortList(state, action.value);
			// 	break;

			case Retrospective.types.RESET:
				return reset();
			break;

			case Retrospective.types.ADD_ITEM:
				return addItem(state, action.data);
			break;

			case Retrospective.types.INCREMENT_VOTE:
				return incrementVote(state, action.data);
			break;

			default:
				console.log('warning unknown action', action.type);
		}

		// emit new state message
		return state;
	}

	// state transforms
	// function sortList(data) {
	// 	// hardcode data.listide
	// 	// sort list
	// 	// set sorted flag
	// 	console.log('transform::sortList()', data);
	// }

	function reset() {
		var newState = Object.assign({}, initialState);
		return newState;
	}

	function incrementVote(state, data) {
		console.log('voting');
		return state;
	}

	function addItem(state, data) {
		// data.listid
		// data.text
		// ?data.vote
		// set sorted to false
		// console.log('transform:addItem', data);
		var text = data.text;
		var list = data.id;

		var newState = Object.assign({}, state);

		newState[list] = newState[list].concat({
			text: text
		});

		return newState;
	}

	if (typeof module !== 'undefined') {
		module.exports = Retrospective;
	}
})(typeof global !== 'undefined' ? global : window);
