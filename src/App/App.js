'use strict'

import {BAD, Layout} from '../Layout'
import {defaultState, DATAKEY} from './index'
import assign from 'lodash/assign'

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.getDefaultState()
		this.addItem = this.addItem.bind(this)
		this.setVoteValue = this.setVoteValue.bind(this)
		this.setEditing = this.setEditing.bind(this)
		this.updateMessage = this.updateMessage.bind(this)
		this.increment = this.increment.bind(this)
		this.persist = this.persist.bind(this)
		this.clearStorage = this.clearStorage.bind(this)
	}

	getDefaultState(reset) {
		let savedState = null;

		if (reset) {
			return assign({}, defaultState)
		} else {
			try {
				savedState = JSON.parse(localStorage.getItem(DATAKEY))
			} catch(e) {}

			return assign({}, defaultState, savedState)
		}
	}

	getChildContext() {
		return {
			actions: {
				addItem: this.addItem,
				setEditing: this.setEditing,
				setVoteValue: this.setVoteValue,
				updateMessage: this.updateMessage,
				increment: this.increment,
				clearStorage: this.clearStorage
			}
		}
	}

	persist() {
		window.requestAnimationFrame(() => {
			localStorage.setItem(DATAKEY, JSON.stringify(this.state))
		})
	}

	updateMessage({value, id, idx}) {
		const mergeState = {}
		let nextList = this.state[id].slice(0)

		if (value.length === 0) {
			nextList = nextList.filter((item, _idx) => {
				return idx !== _idx;
			})
		} else {
			nextList[idx].text = value
		}

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
		this.setVoteValue(idx, parseInt(this.state[BAD][idx].value, 10) + 1)
	}

	addItem({id, text, value}) {
		const newList = this.state[id].slice(0)
		const newItem = {text: text}

		if (value !== undefined) {
			newItem.value = value
		}

		newList.unshift(newItem)

		this.setState((prevState) => {
			return assign({}, prevState, {[id]: newList})
		}, this.persist)
	}

	clearStorage() {
		this.setState(this.getDefaultState(true), this.persist)
	}

	render() {
		return <Layout {...this.state} />
	}
}

App.displayName = 'App'

App.childContextTypes = {
	actions: React.PropTypes.object
}
