'use strict'

import {BAD} from '../Layout'
import {InnerList} from './index'

export default class List extends React.Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(e) {
		const value = this.refs.input.value;
		e.preventDefault()

		if (value.length === 0) {
			return
		}
		const data = {
			id: this.props.id,
			text: value
		}

		if (this.props.id === BAD) {
			data.value = 0
		}
		this.refs.input.value = ''
		this.context.actions.addItem(data)
	}

	render() {
		return <div className='vert'>
			<h2 className='list-title'>{this.props.title}</h2>
			<form action='#' onSubmit={this.onSubmit}>
				<input ref='input' className='message-content' type='text' />
			</form>
			<InnerList {...this.props} />
		</div>
	}
}
List.contextTypes = {
	actions: React.PropTypes.object
}

