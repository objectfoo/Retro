'use strict'

import {BAD, Layout} from '../Layout'
import {defaultState} from './index'
import assign from 'lodash/assign'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		let savedState = null;
		try {
			savedState = JSON.parse(localStorage.getItem('data'))

		} catch(e) {}

		this.state = assign({}, defaultState, savedState)
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

	persist() {
		window.requestAnimationFrame(() => {
			localStorage.setItem('data', JSON.stringify(this.state))
		})
	}

	updateMessage({value, id, idx}) {
		const mergeState = {}
		const nextList = this.state[id].slice(0)

		nextList[idx].text = value

		this.setState((prevState, props) => {
			return assign({}, prevState, {
				editing: null,
				[id]: nextList
			})
		}, this.persist)
	}

	setEditing(data) {
		if (data === null) {
			this.setState({editing: null}, this.persist)
		}
		else {
			this.setState((prevState) => {
				return assign({}, prevState	, {
					editing: {
						id: data.id,
						idx: data.idx
					}
				})
			}, this.persist);
		}
	}

	setVoteValue(idx, value) {
		const nextList = this.state[BAD].slice(0)

		nextList[idx].value = value

		this.setState((prevState) => {
			return assign({}, prevState, {[BAD]: nextList})
		}, this.persist);
	}

	increment(idx) {
		this.setVoteValue(idx, this.state[BAD][idx].value + 1)
	}

	addItem({id, text, value}) {
		const newList = this.state[id].slice(0)
		const newItem = {text: text}

		if (value !== undefined) {
			newItem.value = value
		}

		newList.push(newItem)
		this.setState((prevState) => {
			return assign({}, prevState, {[id]: newList})
		}, this.persist)
	}

	render() {
		return <Layout {...this.state} />
	}
}

App.displayName = 'App'

App.childContextTypes = {
	actions: React.PropTypes.object
}
