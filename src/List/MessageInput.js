'use strict';

import {ESC} from './index'

export default class MessageInput extends React.Component {

	constructor(props) {
		super(props)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.onBlur = this.onBlur.bind(this)
		this.updateMessage = this.updateMessage.bind(this)
	}

	componentDidMount() {
		if (this.refs.input) {
			this.refs.input.focus()
		}
	}

	updateMessage() {
		if (this.refs.input && this.refs.input.value.length > 0) {
			this.props.updateMessage(this.refs.input.value)
		}
	}

	onSubmit(e) {
		e.preventDefault()
		this.updateMessage()
	}

	onBlur() {
		this.updateMessage()
	}

	onKeyDown(e) {
		if (e.which === ESC) {
			this.props.setEditing(true)
		}
	}

	render() {
		return <form action='#' onSubmit={this.onSubmit}>
			<input
				ref='input'
				type='text'
				defaultValue={this.props.defaultValue}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyDown} />
		</form>
	}
}

MessageInput.propTypes = {
	updateMessage: React.PropTypes.func.isRequired
}
