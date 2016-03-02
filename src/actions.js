var Retrospective = (function(Retrospective) {

	var types = Retrospective.types = {
		INCREMENT: 'INCREMENT'
	};

	var actions = Retrospective.actions = {
		increment: increment
	};

	function increment() {
		return { type: types.INCREMENT };
	}

	return Retrospective;
})(window.Retrospective || {});
