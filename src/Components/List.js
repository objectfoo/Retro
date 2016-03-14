'use strict';

import React from 'react';
import {ItemPlain, ItemVoting} from './ListItems';

const List = React.createClass({
	render: function () {
		const items = this.props.items || [];
		const isVoting = Boolean(this.props.isVoting);

		if (items.length === 0) {
			return null;
		}
		return (
			<ul className="pure-menu-list retrospective-list">
			{items.map((item, idx) => {
				const Item = isVoting ? ItemVoting : ItemPlain;
				return (
					<li className="pure-menu-item retrospective-item" key={idx}>
						<Item text={item.text} vote={item.vote} />
					</li>
				);
			})}
			</ul>
		);
	}
});

export {List as default};
