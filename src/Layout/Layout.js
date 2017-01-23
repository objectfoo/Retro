'use strict'

import {GOOD, BAD, NEXT, mapIdToTitle, FocusStyleToggle} from './index'
import {List} from '../List'

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
		const ids = [GOOD, BAD, NEXT]

		this.listDefinitions = ids.map(id => ({
			id: id,
			title: mapIdToTitle(id),
			key: `${id}-list`
		}))
	}

	render() {
		const {setView, clearStorage} = this.context.actions
		const {editing} = this.props

		return(
			<div id='app'>
				<div>
					<div>edit mode</div>
					<ul className='topic'>
						<li className='topic_item'>
							<div className='topic_item-meta'>
								<button className='topic_input topic_input--button'>+</button>
							</div>
							<form action='#'>
								<input type='text' className='topic_input'/>
							</form>
							<form action='#' className='topic_message-form'>
								<input type='text' className='topic_input' />
							</form>
						</li>
					</ul>

					<div>view mode</div>
					<ul className='topic'>
						<li className='topic_item'>
							<div className='tapic_item-meta'>
								<div className='topic_input topic-counter'>A</div>
							</div>
							<form action='#'>
								<input className='topic_input' type='text' />
							</form>
							<div className='topic_message-form'>
								<div className='topic_input'>message content</div>
							</div>
						</li>
					</ul>
				</div>
				<FocusStyleToggle />
				<div className='main-col'>
					<div className='header'>
						<h1 className='text-center'>Retrospective</h1>
					</div>
					<div className='bd'>
						{this.listDefinitions.map((definition) => {
							const list = this.props[definition.id];
								return <List {...definition} list={list} editing={editing} />
						}, this)}
					</div>
					<div className='footer'>
						<button className='button button-default' onClick={() => {clearStorage()}}>clear</button>
						<button className='button button-default' onClick={() => {}}>sort</button>
						<button className='button button-default' onClick={() => {}}>printable</button>
					</div>
				</div>
			</div>
		)
	}
}

Layout.contextTypes = {
	actions: React.PropTypes.object.isRequired
}
