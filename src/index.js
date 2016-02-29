var Retrospective = (function(Retrospective) {
	// need to wait until DOMContentLoaded because we are not using a module system
	// e.g. all the global modules need to be defined before we use them
	document.addEventListener('DOMContentLoaded', function() {
		ReactDOM.render(
			<Retrospective.App />,
			document.getElementById('app')
		);

		document.querySelector('main').classList.remove('preload');
	});

	return Retrospective;
})(window.Retrospective || {});

