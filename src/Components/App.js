'use strict';

const React = require('react');
import ListSection from './ListSection';
import List from './List';
import {actions} from '../store';
import {testData} from '../data';

module.exports = React.createClass({
	displayName: 'App',
	propTypes: {
		store: React.PropTypes.object.isRequired
	},
	getInitialState() {
		return {
			isPrintable: false
		};
	},
	setPrintableTrue: function (x) {
		this.setState({
			isPrintable: true
		});
	},
	render: function () {
		// TODO(ak) remove this test code
		this.props.store.dispatch(actions.reset(testData()));
		const state = this.props.store.getState();
		const good = state.good;
		const bad = state.bad;
		const next = state.next;
		const date = (new Date()).toJSON().replace(/T.*$/, '');

		return (
			<div>
				<header>
					<h1 className="page-header">
						Retrospective <span className="page-sub-header">w/ReactJs</span>
					</h1>
					<p className="page-header__date">Date: <time>{date}</time></p>
				</header>

				<ListSection title="What went well?">
					<List items={good} />
				</ListSection>

				<ListSection title="What needs improvement?">
					<List items={bad} isVoting={true} />
				</ListSection>

				<ListSection title="What do we do next time?">
					<List items={next} />
				</ListSection>

				<footer className="page-footer">
					<button className="pure-button button-default" type="button">Sort</button>
					<button className="pure-button button-default" type="button">Printable</button>
					<button className="pure-button button-default" type="button">Clear All</button>
				</footer>
			</div>
		);
	}
});
