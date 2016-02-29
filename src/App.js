var Retrospective = (function(Retrospective) {
	var items = ['item 1', 'item 2'];


	Retrospective.App = React.createClass({
		render: function() {
			var List = Retrospective.List;

			return(
				<div>
					<header>
						<h1>Retrospective</h1>
						<h2>Q&D reactJs version</h2>
						<div>
							<button type="button">Clear All</button>
							<div>Date: XXXXXXX</div>
						</div>
					</header>
					
					<section>
						<h2>What went well?</h2>
						<div>input: <input autoComplete="off" type="text" /></div>
						<List items={items} />
					</section>

					<section>
						<h2>What went needs improvement?</h2>
						<div>input: <input autoComplete="off" type="text" /></div>
						<List items={items} />
					</section>

					<section>
						<h2>What do we do next time?</h2>
						<div>input: <input autoComplete="off" type="text" /></div>
						<List items={items} isVoting={true} />
					</section>

					<footer>
						<button type="button">Sort</button>
						<button type="button">Printable</button>
					</footer>
				</div>
			);
		}
	});

	return Retrospective;
})(window.Retrospective || {});


