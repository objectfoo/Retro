'use strict';

import React, {Component} from 'react';

class List extends React.Component {
	render() {
		const items = this.props.items;
		const isVoting = Boolean(this.props.isVoting);

		if (items === undefined || items.length === 0) {
			return null;
		}

		return (
			<ul className="pure-menu-list retrospective-list">
				{items.map((item, idx) => {
					// const Item = isVoting ? ItemVoting : ItemPlain;
					const Message = isVoting ? 'Voting' : 'Plain';
					return (
						<Item key={idx}>
							{`${Message} - ${item.text}`}
						</Item>
					);
				})}
			</ul>
		);
	}
}

function Item(props) {
	return (
		<li className="pure-menu-item retrospective-item">
			<div className="retrospective-item__text">
				{props.children}
			</div>
		</li>
	);
}

export {List as default};
