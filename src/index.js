(function(g) {
	g.Retrospective = g.Retrospective || {};

	// need to wait until DOMContentLoaded because we are not using a module system
	// e.g. all the global modules need to be defined before we use them
	document.addEventListener('DOMContentLoaded', function() {
		const Retrospective = g.Retrospective;
		const store = Retrospective.store;

		console.log(Object.keys(Retrospective));
		
		ReactDOM.render(
			<Retrospective.App store={store} />,
			document.getElementById('app')
		);

		document.querySelector('main').classList.remove('preload');
	});

	if (typeof exports !== 'undefined') {
		exports.Retrospective = Retrospective;
	}

	return Retrospective;
})(typeof global !== 'undefined' ? global : window);
