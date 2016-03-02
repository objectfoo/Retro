'use strict';

var Retrospective = function (Retrospective) {
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

	return Retrospective;
}(window.Retrospective || {});
'use strict';

var Retrospective = function (Retrospective) {

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

	return Retrospective;
}(window.Retrospective || {});
'use strict';

var Retrospective = function (Retrospective) {

	var types = Retrospective.types = {
		INCREMENT: 'INCREMENT'
	};

	var actions = Retrospective.actions = {
		increment: increment
	};

	function increment() {
		return { type: types.INCREMENT };
	}

	return Retrospective;
}(window.Retrospective || {});
'use strict';

var Retrospective = function (Retrospective) {
	// need to wait until DOMContentLoaded because we are not using a module system
	// e.g. all the global modules need to be defined before we use them
	document.addEventListener('DOMContentLoaded', function () {
		var createStore = Redux.createStore;
		var reducer = Retrospective.reducer;

		var store = createStore(reducer);

		ReactDOM.render(React.createElement(Retrospective.App, { store: store }), document.getElementById('app'));

		document.querySelector('main').classList.remove('preload');
	});

	return Retrospective;
}(window.Retrospective || {});
"use strict";

var Retrospective = function (Retrospective) {

	Retrospective.reducer = function reducer(state, action) {

		switch (action.type) {
			default:
				state = { count: 0 };
		}

		return state;
	};

	return Retrospective;
}(window.Retrospective || {});
