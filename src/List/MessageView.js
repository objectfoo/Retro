'use strict';

export default class MessageView extends React.Component {
	constructor(props) {
		super(props)
		this.onDoubleClick = this.onDoubleClick.bind(this)
	}

	onDoubleClick() {
		this.props.setEditing()
	}

	render() {
		return <div className='message-content' onDoubleClick={this.onDoubleClick}>
			{this.props.text}
		</div>
	}
}

MessageView.propTypes = {
	text: React.PropTypes.string
}
