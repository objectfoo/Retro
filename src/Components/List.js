(function(global) {
	global.Retrospective = global.Retrospective || {};
	
	Retrospective.List = React.createClass({
		displayName: 'List',
		propTypes: {
			items: React.PropTypes.array.isRequired
		},

		render: function() {
			var Item = this.props.isVoting ? VotingListItem : ListItem;

			return(
				<ul>
					{this.props.items.map((item, idx) =>
						<Item key={'list-' + idx} text={item} />
					)}
				</ul>
			);
		}
	});

	function ListItem(props) {
		return (<li>{props.text}</li>);
	}
	ListItem.propTypes = {
		text: React.PropTypes.string.isRequired
	};


	function VotingListItem(props) {
		return (
			<li>
				<button type="button">+</button>
				Vote: <input autoComplete="off" type="text" /> {props.text}
			</li>
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
