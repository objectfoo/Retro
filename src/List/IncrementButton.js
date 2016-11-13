'use strict';

export default class IncrementButton extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<button
				onClick={this.props.onIncrement}
				className='increment-vote-button'>+</button>
		)
	}
}
