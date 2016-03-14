'use strict';
import React from 'react';

const List = React.createClass({
	render: function () {
		const items = this.props.items || [];
		if (items.length === 0) {
			return null;
		}
		return (
			<ul className="pure-menu-list retrospective-list">
			{items.map((item, idx) => {
				return (
					<li className="pure-menu-item retrospective-item" key={idx}>
						<div className="retrospective-item__text">
							{item.text}
						</div>
					</li>
				);
			})}
			</ul>
		);
	}
});

export {List as default};
