(function (global) {
	const Retrospective = global.Retrospective = global.Retrospective || {};

	Retrospective.List = React.createClass({
		displayName: 'List',

		// propTypes: {
		// 	items: React.PropTypes.array.isRequired
		// },

		render: function () {
			/* eslint-disable prefer-const */
			const isVoting = this.props.isVoting !== undefined;
			const RetrospectiveItem = Retrospective.RetrospectiveItem;

			return (
				<ul className="pure-menu-list retrospective-list">
					{this.props.items.map((item, idx) => {
						let props = {key: `list-${idx}`};
						if (item.vote === undefined) {
							props.text = item;
						} else {
							props.item = item;
							props.isVoting = isVoting;
						}

						return <RetrospectiveItem {...props} />;
					})}
				</ul>
			);
		}
	});

	// function DefaultRetrospectiveItem(props) {
	// 	return (
	// 		<li className="pure-menu-item retrospective-item">
	// 			<div className="retrospective-item__text">
	// 				{props.text}
	// 			</div>
	// 			<button type="button" className="close" aria-label={"Close"}>
	// 				<span arial-hidden="true">&times;</span>
	// 			</button>
	// 		</li>
	// 	);
	// }
	//
	// DefaultRetrospectiveItem.propTypes = {
	// 	text: React.PropTypes.string.isRequired
	// };
	//
	// const VotingRetrospectiveItem = React.createClass({
	// 	displayName: 'VotingRetrospectiveItem',
	//
	// 	getInitialState: function () {
	// 		return {isEditing: false};
	// 	},
	//
	// 	renderVoteBox: function () {
	// 		return (
	// 			<div className="retrospective-item__vote-input">
	// 				<input autoComplete="off" type="text" />
	// 			</div>
	// 		);
	// 	},
	//
	// 	renderText: function (text) {
	// 		return (
	// 			<div className="retrospective-item__text">{text}</div>
	// 		);
	// 	},
	//
	// 	renderClose: function () {
	// 		return (
	// 			<button type="button" className="close" aria-label={"Close"}>
	// 				<span arial-hidden="true">&times;</span>
	// 			</button>
	// 		);
	// 	},
	//
	// 	onDoubleClick: function () {
	// 		this.setState({
	// 			isEditing: !this.state.isEditing
	// 		});
	// 	},
	//
	// 	render: function () {
	// 		const props = this.props;
	// 		const liProps = {
	// 			className: "pure-menu-item retrospective-item pure-form",
	// 			onDoubleClick: this.onDoubleClick
	// 		};
	// 		const inputProps = {
	// 			className: 'pure-input-1',
	// 			defaultValue: props.item.text,
	// 			type: 'text'
	// 		};
	//
	// 		if (this.state.isEditing) {
	// 			return (
	// 				<li {...liProps}><input {...inputProps} /></li>);
	// 		}
	//
	// 		return (
	// 			<li className="pure-menu-item retrospective-item pure-g">
	// 				<div className="pure-u-1-24">
	// 					<input className="pure-input-1" type="text" defaultValue={props.item.vote} />
	// 				</div>
	// 				<div className="pure-u-23-24" onDoubleClick={this.onDoubleClick}>
	// 					{props.item.text}
	// 				</div>
	// 			</li>
	// 		);
	// 	}
	// });
	//
	// function RetrospectiveItem(props) {
	// 	const Component = props.isVoting === true ?
	// 		VotingRetrospectiveItem :
	// 		DefaultRetrospectiveItem;
	//
	// 	return <Component {...props} />;
	// }

	if (typeof exports !== 'undefined') {
		module.exports = Retrospective.List;
	}
})(typeof global === 'undefined' ? window : global);
