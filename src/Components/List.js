(function (global) {
	const Retrospective = global.Retrospective = global.Retrospective || {};

	Retrospective.List = React.createClass({
		displayName: 'List',

		propTypes: {
			items: React.PropTypes.array.isRequired
		},

		render: function () {
			/* eslint-disable prefer-const */
			const isVoting = this.props.isVoting !== undefined;

			return (
				<ul className="pure-menu-list retrospective-list">
					{this.props.items.map((item, idx) => {
						const props = {
							key: `list-${idx}`,
							text: item,
							isVoting: isVoting
						};
						return <RetrospectiveItem
							key={`list-${idx}`}
							text={item}
							isVoting={isVoting} />;
					})}
				</ul>
			);
		}
	});

	function RetrospectiveItem(props) {
		const vote = props.vote;
		const text = props.text;
		const Component = props.isVoting ?
			VotingRetrospectiveItem :
			DefaultRetrospectiveItem;

		return <Component text={text} vote={vote} />;
	}

	function DefaultRetrospectiveItem(props) {
		return (
			<li className="pure-menu-item retrospective-item">
				<div className="retrospective-item__text">
					{props.text}
				</div>
				<button type="button" className="close" aria-label={"Close"}>
					<span arial-hidden="true">&times;</span>
				</button>
			</li>
		);
	}

	DefaultRetrospectiveItem.propTypes = {
		text: React.PropTypes.string.isRequired
	};

	function VotingRetrospectiveItem(props) {
		return (
			<li className="retrospective-item retrospective-item--voting">
				{/* TODO render input or text depending on editing state*/}
				<div className="retrospective-item__vote-input">
					<input autoComplete="off" type="text" />
				</div>
				<div className="retrospective-item__text">
					{props.text}
				</div>
				<button type="button" className="close" aria-label={"Close"}>
					<span arial-hidden="true">&times;</span>
				</button>
			</li>
		);
	}

	VotingRetrospectiveItem.propTypes = {
		text: React.PropTypes.string.isRequired
	};

	if (typeof exports !== 'undefined') {
		module.exports = Retrospective.List;
	}
})(typeof global === 'undefined' ? window : global);
