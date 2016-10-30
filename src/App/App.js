'use strict'

import {GOOD, BAD, NEXT, Layout, DEFAULT_VIEW} from '../Layout'
const defaultState = {
	[GOOD]: [],
	[BAD]: [],
	[NEXT]: [],
	view: DEFAULT_VIEW
}

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = Object.assign({}, defaultState)
		this.addItem = this.addItem.bind(this)
		this.setVoteValue = this.setVoteValue.bind(this)
	}

	getChildContext() {
		return {
			actions: {
				addItem: this.addItem,
				setVoteValue: this.setVoteValue
			}
		}
	}

	setVoteValue(index, value) {
		const newList = this.state[BAD].map((item, _index) => {
			if (index === _index) {
				return Object.assign({}, item, {value: value})
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

	render() {
		return <Layout {...this.state} />
	}
}

App.displayName = 'App'

App.childContextTypes = {
	actions: React.PropTypes.object
}
