'use strict';

import {MessageView, MessageInput} from './index'

export default class MessageWrapper	 extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		const {isEditing, text} = this.props

		if (isEditing) {
			return <MessageInput
				defaultValue={text}
				setEditing={this.props.setEditing}
				updateMessage={this.props.updateMessage}/>
		} else {
			return <MessageView
				text={text}
				setEditing={this.props.setEditing} />
		}
	}
}
