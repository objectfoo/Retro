import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag} from 'react-addons-test-utils';
import List from '../src/Components/List';

describe.skip('List', () => {
	const items = ['item 1', 'item 2'];
	const component = renderIntoDocument(<List items={items} />);

	it('should render a list', () => {
		const listItems = scryRenderedDOMComponentsWithTag(component, 'li');

		console.log(listItems[0].textContent);

		expect(listItems.length).to.equal(2);
		expect(listItems[0].textContent).to.include.string('item 1');
		expect(listItems[1].textContent).to.include.string('item 2');
	});
});

describe.skip('List - voting', () => {
	const items = [
		{text: 'item 1', vote: 0},
		{text: 'item 2', vote: 0}
	];
	const component = renderIntoDocument(
		<List items={items} isVoting={true}/>
	);

	it('should render an item with text', () => {
		const listItems = scryRenderedDOMComponentsWithTag(component, 'li');

		expect(listItems).to.have.lengthOf(2);
		expect(listItems[0].textContent).to.include.string('item 1');
		expect(listItems[1].textContent).to.include.string('item 2');
	});

	it('should render a button inside each item', () => {
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		// epxect clicks on button to do something
		// expect(buttons).to.have.lengthOf(2);
	});

	it('should render an input inside each item', () => {
		const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
		expect(inputs).to.have.lengthOf(2);
	});
});
