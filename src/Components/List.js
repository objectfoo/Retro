(function (global) {
	const Retrospective = global.Retrospective = global.Retrospective || {};

	Retrospective.List = React.createClass({
		displayName: 'List',

		propTypes: {
			items: React.PropTypes.array.isRequired
		},

		render: function () {
			const Item = this.props.isVoting ? VotingRetrospectiveItem : RetrospectiveItem;
			return (
				<ul className="pure-menu-list retrospective-list">
					{this.props.items.map((item, idx) =>
						<Item key={`list-${idx}`} text={item} />
					)}
				</ul>
			);
		}
	});

	function RetrospectiveItem(props) {
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

	RetrospectiveItem.propTypes = {
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
