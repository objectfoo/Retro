'use strict';
const React = require('react');

const List = React.createClass({
	render: function () {
		const items = this.props.items;

		if (items.length === 0) {
			return null;
		}

		return (
			<ul className="pure-menu-list retrospective-list">
			{items.map((item, idx) => {
				return <li>{item.text}</li>;
			})}
			</ul>
		);
		// return (
		// 	<ul className="pure-menu-list retrospective-list">
		// 		{this.props.items.map((item, idx) => {
		// 			console.log('asdf', item);
		// 			// let props = {key: `list-${idx}`};
		// 			// if (item.vote === undefined) {
		// 			// 	props.text = item;
		// 			// } else {
		// 			// 	props.item = item;
		// 			// 	props.isVoting = isVoting;
		// 			// }
		// 			return <li>{item.text}</li>;
		// 		})}
		// 	</ul>
		// );
	}
});

export {List as default};

//
//
// (function (global) {
// 	const Retrospective = global.Retrospective = global.Retrospective || {};
//
// 	Retrospective.List = React.createClass({
// 		displayName: 'List',
//
// 		// propTypes: {
// 		// 	items: React.PropTypes.array.isRequired
// 		// },
//
// 		render: function () {
// 			/* eslint-disable prefer-const */
// 			const isVoting = this.props.isVoting !== undefined;
// 			const RetrospectiveItem = Retrospective.RetrospectiveItem;
//
// 			return (
// 				<ul className="pure-menu-list retrospective-list">
// 					{this.props.items.map((item, idx) => {
// 						let props = {key: `list-${idx}`};
// 						if (item.vote === undefined) {
// 							props.text = item;
// 						} else {
// 							props.item = item;
// 							props.isVoting = isVoting;
// 						}
//
// 						return <RetrospectiveItem {...props} />;
// 					})}
// 				</ul>
// 			);
// 		}
// 	});
//
// 	if (typeof exports !== 'undefined') {
// 		module.exports = Retrospective.List;
// 	}
// })(typeof global === 'undefined' ? window : global);
