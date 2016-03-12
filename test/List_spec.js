const expect = require('chai').expect;
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const renderIntoDocument = ReactTestUtils.renderIntoDocument;
const scryRenderedDOMComponentsWithTag = ReactTestUtils.scryRenderedDOMComponentsWithTag;

const List = require('../src/Components/List');

describe('List', function() {
	const items = ['item 1', 'item 2'];
	const component = renderIntoDocument(
		<List items={items} />
	);

	it('should render a list', function() {
		const listItems = scryRenderedDOMComponentsWithTag(component, 'li');

		expect(listItems.length).to.equal(2);
		expect(listItems[0].textContent).to.include.string('item 1');
		expect(listItems[1].textContent).to.include.string('item 2');
	});
});


describe('List - voting', function() {
	const items = ['item 1', 'item 2'];
	const component = renderIntoDocument(
		<List items={items} isVoting={true}/>
	);

	it('should render an item with text', function() {
		const listItems = scryRenderedDOMComponentsWithTag(component, 'li');

		expect(listItems).to.have.lengthOf(2);
		expect(listItems[0].textContent).to.include.string('item 1');
		expect(listItems[1].textContent).to.include.string('item 2');
	});

	it('should render a button inside each item', function() {
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons).to.have.lengthOf(2);
		expect(buttons[0].textContent).to.have.string('+');
		expect(buttons[1].textContent).to.have.string('+');
	});

	it('should render an input and label inside each item', function() {
		const labels = scryRenderedDOMComponentsWithTag(component, 'label');
		const inputs = scryRenderedDOMComponentsWithTag(component, 'input');

		expect(labels).to.have.lengthOf(2);

		expect(labels[0].textContent).to.have.string('Vote:');
		expect(labels[1].textContent).to.have.string('Vote:');

		expect(inputs).to.have.lengthOf(2);
	});
});