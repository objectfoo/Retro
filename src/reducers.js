var Retrospective = (function(Retrospective) {

	Retrospective.reducer = function reducer(state, action) {

		switch (action.type) {
			default:
				state = { count: 0 };
		}

		return state;
	};

	return Retrospective;
})(window.Retrospective || {});
