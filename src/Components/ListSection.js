'use strict';

const React = require('react');

function ListSection(props) {
	const title = props.title;

	return (
		<section>
			<h2 className="visible-aria-only">{title}</h2>
			<div className="pure-form">
				<input className="pure-input-1 input-no-border-radius" autoComplete="off" type="text" placeholder={title} />
				{props.children}
			</div>
		</section>
	);
}

ListSection.propTypes = {
	title: React.PropTypes.string.isRequired
};

export {ListSection as default};
