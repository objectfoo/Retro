(function (global) {
	const Retrospective = global.Retrospective = global.Retrospective || {};

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

	// DefaultRetrospectiveItem.propTypes = {
	// 	text: React.PropTypes.string.isRequired
	// };

	const VotingRetrospectiveItem = React.createClass({
		displayName: 'VotingRetrospectiveItem',

		getInitialState: function () {
			return {isEditing: false};
		},

		renderVoteBox: function () {
			return (
				<div className="retrospective-item__vote-input">
					<input autoComplete="off" type="text" />
				</div>
			);
		},

		renderText: function (text) {
			return (
				<div className="retrospective-item__text">{text}</div>
			);
		},

		renderClose: function () {
			return (
				<button type="button" className="close" aria-label={"Close"}>
					<span arial-hidden="true">&times;</span>
				</button>
			);
		},

		onDoubleClick: function () {
			this.setState({
				isEditing: !this.state.isEditing
			});
		},

		render: function () {
			const props = this.props;
			const liProps = {
				className: "pure-menu-item retrospective-item pure-form",
				onDoubleClick: this.onDoubleClick
			};
			const inputProps = {
				className: 'pure-input-1',
				defaultValue: props.item.text,
				type: 'text'
			};

			if (this.state.isEditing) {
				return (
					<li {...liProps}><input {...inputProps} /></li>);
			}

			return (
				<li className="pure-menu-item retrospective-item pure-g">
					<div className="pure-u-1-24">
						<input className="pure-input-1" type="text" defaultValue={props.item.vote} />
					</div>
					<div className="pure-u-23-24" onDoubleClick={this.onDoubleClick}>
						{props.item.text}
					</div>
				</li>
			);
		}
	});

	Retrospective.RetrospectiveItem = function (props) {
		const Component = props.isVoting === true ?
			VotingRetrospectiveItem :
			DefaultRetrospectiveItem;

		return <Component {...props} />;
	};

	if (typeof exports !== 'undefined') {
		module.exports = Retrospective.RetrospectiveItem;
	}
})(typeof global === 'undefined' ? window : global);
