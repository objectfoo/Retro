'use strict'

import {GOOD, BAD, NEXT, Layout, DEFAULT_VIEW} from '../Layout'
import assign from 'lodash/assign'
const defaultState = {
	[GOOD]: [],
	[BAD]: [],
	[NEXT]: [],
	view: DEFAULT_VIEW,
	editing: null
}

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = assign({}, defaultState)
		this.addItem = this.addItem.bind(this)
		this.setVoteValue = this.setVoteValue.bind(this)
		this.setEditing = this.setEditing.bind(this)
		this.updateMessage = this.updateMessage.bind(this)
		this.increment = this.increment.bind(this)
	}

	getChildContext() {
		return {
			actions: {
				addItem: this.addItem,
				setEditing: this.setEditing,
				setVoteValue: this.setVoteValue,
				updateMessage: this.updateMessage,
				increment: this.increment
			}
		}
	}

	updateMessage({value, id, idx}) {
		const mergeState = {}

		mergeState[id] = this.state[id].slice(0)
		mergeState[id][idx].text = value
		mergeState.editing = null

		this.setState(assign({}, this.state, mergeState))
	}

	setEditing(data) {
		if (data !== null) {
			this.setState({
				editing: {
					id: data.id,
					idx: data.idx
				}
			});
		}
		else {
			this.setState({editing: null})
		}
	}

	setVoteValue(index, value) {
		const newList = this.state[BAD].map((item, _index) => {
			if (index === _index) {
				return assign({}, item, {value: value})
			} else {
				return item
			}
		})

		this.setState({[BAD]: newList})
	}

	addItem({id, text, value}) {
		const newList = this.state[id].slice(0)
		const newItem = {text: text}

		if (value !== undefined) {
			newItem.value = value
		}

		newList.push(newItem)
		this.setState({[id]: newList})
	}

	increment(idx) {
		const nextList = this.state[BAD].map((item, _idx) => {
			if (_idx === idx) {
				item = assign({}, item, {value: item.value + 1})
			}

			return item;
		})

		this.setState({
			[BAD]: nextList
		})
	}

	render() {
		return <Layout {...this.state} />
	}
}

App.displayName = 'App'

App.childContextTypes = {
	actions: React.PropTypes.object
}
