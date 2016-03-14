'use strict';
const React = require('react');
import List from './List';
import {actions} from '../store';
import {testData} from '../data';

module.exports = React.createClass({
	displayName: 'App',
	propTypes: {
		store: React.PropTypes.object.isRequired
	},

	render: function () {
		this.props.store.dispatch(actions.reset(testData()));
		const state = this.props.store.getState();
		const good = state.good;
		const bad = state.bad;
		const next = state.next;
		const date = (new Date()).toJSON().replace(/T.*$/, '');

		return (
			<div>
				<header>
					<h1 className="page-header">Retrospective <span className="page-sub-header">w/ReactJs</span></h1>
					<p className="page-header__date">Date: <time>{date}</time></p>
				</header>

				<section>
					<h2 className="visible-aria-only">What went well?</h2>
					<div className="pure-form">
						<input className="pure-input-1 input-no-border-radius" autoComplete="off" type="text" placeholder="What went well?" />
						<List items={good} />
					</div>
				</section>

				<section>
					<h2 className="visible-aria-only">What needs improvement?</h2>
					<div className="pure-form">
						<input className="pure-input-1 input-no-border-radius" autoComplete="off" type="text" placeholder="What needs improvement?" />
						<List items={bad} isVoting={true} />
					</div>
				</section>

				<section>
					<h2 className="visible-aria-only">What do we do next time?</h2>
					<div className="pure-form">
						<input className="pure-input-1 input-no-border-radius" autoComplete="off" type="text" placeholder="What do we do next time?" />
						<List items={next} />
					</div>
				</section>

				<footer className="page-footer">
					<button className="pure-button button-default" type="button">Sort</button>
					<button className="pure-button button-default" type="button">Printable</button>
					<button className="pure-button button-default" type="button">Clear All</button>
				</footer>
			</div>
		);
	}
});
