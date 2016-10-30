'use strict'

import {BAD} from '../Layout'
import {VoteInput} from './index'

export default class InnerList extends React.Component {
	constructor(props) {
		super(props)
		this.setVoteValue = this.setVoteValue.bind(this)
	}

	setVoteValue(idx) {
		return value => {
			return this.context.actions.setVoteValue(idx, value)
		}
	}

	render() {
		const {list} = this.props
		if (list.length === 0) {
			return null
		} else {
		return <ul>
			{list.map((item, idx) => {
				return <li key={`${this.props.id.toLowerCase()}-${idx}`}>
					<VoteInput value={item.value} setVoteValue={this.setVoteValue(idx)} />
					{/* move item.text to it's own component */}
					{/* refactor to toggle between edit and view mode */}
					{item.text}
				</li>
			})}
		</ul>
		}
	}
}
InnerList.contextTypes = {
	actions: React.PropTypes.object
}
