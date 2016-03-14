'use strict';

import React from 'react';

function ItemPlain(props) {
	return (
		<div className="retrospective-item__text">
			{props.text}
		</div>
	);
}

function ItemVoting(props) {
	return (
		<div className="retrospective-item__text">
			Voting - {props.text}
		</div>
	);
}

export {ItemPlain, ItemVoting};
