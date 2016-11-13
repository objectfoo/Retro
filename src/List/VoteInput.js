'use strict'

import preventNonNumericInput, {UP, DOWN} from './lib/preventNonNumericInput'


export default class VoteInput extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onKeyDown = this.onKeyDown.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	onSubmit(e) {
		e.preventDefault()
		this.props.setVoteValue(this.refs.vote.value)
	}

	onBlur() {
		this.onChange()
	}

	onChange() {
		const value = this.refs.vote.value.replace(/[^\d]/g, '')
		this.props.setVoteValue(value.length === 0 ? 0 : value)
	}

	onKeyDown(e) {
		const code = e.keyCode
		let value = parseInt(this.refs.vote.value, 10)
		if (isNaN(value)) {
			value = 0
		}
		preventNonNumericInput(e)

		if (code === UP) {
			value = value + 1
			this.props.setVoteValue(value)
			e.preventDefault()
		} else if (code === DOWN) {
			value = value - 1
			this.props.setVoteValue(value <= 0 ? 0 : value)
			e.preventDefault()
		}
	}

	render() {
		if (this.props.value === undefined) {
			return null
		}
		else {
			return <form action='#' onSubmit={this.onSubmit}>
				<input ref='vote'
					className='message-vote text-center'
					value={this.props.value}
					onKeyDown={this.onKeyDown}
					onChange={this.onChange}
					onBlur={this.onBlur}
				/>
			</form>
		}
	}
}
VoteInput.contextTypes = {
	actions: React.PropTypes.object
}