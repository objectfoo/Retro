'use strict'

import {BAD} from '../Layout' // get rid of this cross module dependency
import {VoteInput, MessageWrapper, IncrementButton} from './index'

export default class InnerList extends React.Component {
	constructor(props) {
		super(props)
		this.setVoteValue = this.setVoteValue.bind(this)
		this.createUpdateMessageHandler = this.createUpdateMessageHandler.bind(this)
		this.isEditing = this.isEditing.bind(this)
		this.createSetEditingHandler = this.createSetEditingHandler.bind(this)
	}

	setVoteValue(idx) {
		return value => {
			return this.context.actions.setVoteValue(idx, value)
		}
	}

	createUpdateMessageHandler(idx) {
		const {id} = this.props

		return (value) => {
			this.context.actions.updateMessage({value, idx, id});
		}
	}


	isEditing(idx) {
		return !!this.props.editing // !! will convert nulls to false
			&& this.props.editing.id === this.props.id
			&& this.props.editing.idx === idx;
	}

	createSetEditingHandler(idx) {
		const {id} = this.props

		return (clear) => {
			this.context.actions.setEditing(clear === true ? null : {id, idx})
		}
	}

	createIncrementHandler(idx) {
		return () => {
			this.context.actions.increment(idx)
		}
	}

	renderIncrementButton(idx) {
		if (this.props.id !== BAD) {
			return null
		}

		return <IncrementButton
			onIncrement={this.createIncrementHandler(idx)} />
	}

	render() {
		const {list, id} = this.props

		if (list.length === 0) {
			return null
		} else {
		return <ul className='inner-list'>
			{list.map((item, idx) => {
				return <li key={`${this.props.id.toLowerCase()}-${idx}`}>
					{this.renderIncrementButton(idx)}
					<VoteInput value={item.value} setVoteValue={this.setVoteValue(idx)} />
					<MessageWrapper
						text={item.text}
						isEditing={this.isEditing(idx)}
						setEditing={this.createSetEditingHandler(idx)}
						updateMessage={this.createUpdateMessageHandler(idx)} />
				</li>
			})}
		</ul>
		}
	}
}

InnerList.contextTypes = {
	actions: React.PropTypes.object
}
