'use strict';

(function (global) {
	global.Retrospective = global.Retrospective || {};
	var items = ['item 1', 'item 2'];

	Retrospective.App = React.createClass({
		displayName: 'App',

		getInitialState: function getInitialState() {
			return this.props.store.getState();
		},

		render: function render() {
			var List = Retrospective.List;

			return React.createElement(
				'div',
				null,
				React.createElement(
					'header',
					null,
					React.createElement(
						'h1',
						null,
						'Retrospective'
					),
					React.createElement(
						'h2',
						null,
						'Q&D reactJs version'
					),
					React.createElement(
						'p',
						null,
						'Behold! Intro text... with some state: ',
						this.state.count
					),
					React.createElement(
						'div',
						null,
						React.createElement(
							'button',
							{ type: 'button' },
							'Clear All'
						),
						React.createElement(
							'div',
							null,
							'Date: XXXXXXX'
						)
					)
				),
				React.createElement(
					'section',
					null,
					React.createElement(
						'h2',
						null,
						'What went well?'
					),
					React.createElement(
						'div',
						null,
						'input: ',
						React.createElement('input', { autoComplete: 'off', type: 'text' })
					),
					React.createElement(List, { items: items })
				),
				React.createElement(
					'section',
					null,
					React.createElement(
						'h2',
						null,
						'What went needs improvement?'
					),
					React.createElement(
						'div',
						null,
						'input: ',
						React.createElement('input', { autoComplete: 'off', type: 'text' })
					),
					React.createElement(List, { items: items })
				),
				React.createElement(
					'section',
					null,
					React.createElement(
						'h2',
						null,
						'What do we do next time?'
					),
					React.createElement(
						'div',
						null,
						'input: ',
						React.createElement('input', { autoComplete: 'off', type: 'text' })
					),
					React.createElement(List, { items: items, isVoting: true })
				),
				React.createElement(
					'footer',
					null,
					React.createElement(
						'button',
						{ type: 'button' },
						'Sort'
					),
					React.createElement(
						'button',
						{ type: 'button' },
						'Printable'
					)
				)
			);
		}
	});

	if (typeof exports !== 'undefined') {
		exports.Retrospective = Retrospective;
	}
})(typeof global !== 'undefined' ? global : window);
'use strict';

(function (global) {
	global.Retrospective = global.Retrospective || {};

	Retrospective.List = React.createClass({
		displayName: 'List',
		propTypes: {
			items: React.PropTypes.array.isRequired
		},

		render: function render() {
			var Item = this.props.isVoting ? VotingListItem : ListItem;

			return React.createElement(
				'ul',
				null,
				this.props.items.map(function (item, idx) {
					return React.createElement(Item, { key: 'list-' + idx, text: item });
				})
			);
		}
	});

	function ListItem(props) {
		return React.createElement(
			'li',
			null,
			props.text
		);
	}
	ListItem.propTypes = {
		text: React.PropTypes.string.isRequired
	};

	function VotingListItem(props) {
		return React.createElement(
			'li',
			null,
			React.createElement(
				'button',
				{ type: 'button' },
				'+'
			),
			'Vote: ',
			React.createElement('input', { autoComplete: 'off', type: 'text' }),
			' ',
			props.text
		);
	}
	VotingListItem.propTypes = {
		text: React.PropTypes.string.isRequired
	};

	if (typeof exports !== 'undefined') {
		exports.Retrospective = Retrospective;
	}

	return Retrospective;
})(typeof global !== 'undefined' ? global : window);
'use strict';

(function (g) {
	g.Retrospective = g.Retrospective || {};

	// need to wait until DOMContentLoaded because we are not using a module system
	// e.g. all the global modules need to be defined before we use them
	document.addEventListener('DOMContentLoaded', function () {
		var Retrospective = g.Retrospective;
		var store = Retrospective.store;

		console.log(Object.keys(Retrospective));

		ReactDOM.render(React.createElement(Retrospective.App, { store: store }), document.getElementById('app'));

		document.querySelector('main').classList.remove('preload');
	});

	if (typeof exports !== 'undefined') {
		exports.Retrospective = Retrospective;
	}

	return Retrospective;
})(typeof global !== 'undefined' ? global : window);
'use strict';

(function (global) {
	global.Retrospective = global.Retrospective || {};
	// var Retrospective = global.Retrospective || {};

	// Initial State
	var state = {
		isSorted: false,
		good: [],
		bad: [],
		next: []
	};

	// Action Types
	Retrospective.types = {
		SORT: 'SORT',
		ADD_ITEM: 'ADD_ITEM'
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
		}
	};

	// Store
	Retrospective.store = {
		getState: function getState() {
			return state;
		},
		dispatch: function dispatch(action) {
			state = reduce(state, action);
		}
	};

	// Reducer
	function reduce(state, action) {

		switch (action.type) {
			// case Retrospective.types.SORT:
			// 	sortList(state, action.value);
			// 	break;

			case Retrospective.types.ADD_ITEM:
				return addItem(state, action.data);
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

	function addItem(state, data) {
		// data.listid
		// data.text
		// ?data.vote
		// set sorted to false
		// console.log('transform:addItem', data);
		var text = data.text;
		var list = data.id;
		var delta = {};

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
