(function(global) {
	global.Retrospective = global.Retrospective || {};
	var items = ['item 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'item 2'];

	Retrospective.App = React.createClass({
		getInitialState: function() {
			return this.props.store.getState();
		},

		render: function() {
			var List = Retrospective.List;
			var date = new Date().toJSON().replace(/T.+$/, '');

			return(
				<div>
					<header>
						<h1 className="page-header">Retrospective <span className="page-sub-header">ReactJs version</span></h1>
						<p className="page-header__date">Date: <time>{date}</time></p>
					</header>

					<section>
						<h2 className="visible-aria-only">What went well?</h2>
						<div className="pure-form">
							<input className="pure-input-1 input-no-border-radius" autoComplete="off" type="text" placeholder="What went well?" />
							<List items={items} />
						</div>
					</section>

					<section>
						<h2 className="visible-aria-only">What needs improvement?</h2>
						<div className="pure-form">
							<input className="pure-input-1 input-no-border-radius" autoComplete="off" type="text" placeholder="What needs improvement?" />

							<List items={items} />
						</div>
					</section>

					<section>
						<h2 className="visible-aria-only">What do we do next time?</h2>
						<div className="pure-form">
							<input className="pure-input-1 input-no-border-radius" autoComplete="off" type="text" placeholder="What do we do next time?" />
							<List items={items} isVoting={true} />
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

	if (typeof exports !== 'undefined') {
		module.exports = Retrospective.App;
	}
})(typeof global !== 'undefined' ? global : window);
