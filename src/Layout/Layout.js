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
		const {setView} = this.context.actions
		const {editing} = this.props

		return(
			<div id='app'>
				<FocusStyleToggle />
				<div className='main-col'>
					<div className='header'>
						<h1 className='text-center'>Retrospective</h1>
						<p>
							<button onClick={() => {}}>clear</button>
						</p>
					</div>
					<div className='bd'>
						{this.listDefinitions.map((definition) => {
							const list = this.props[definition.id];
								return <List {...definition} list={list} editing={editing} />
						}, this)}
					</div>
					<div className='footer'>
						<button onClick={() => {}}>sort</button>
						<button onClick={() => {}}>printable</button>
					</div>
				</div>
			</div>
		)
	}
}

Layout.contextTypes = {
	actions: React.PropTypes.object.isRequired
}
