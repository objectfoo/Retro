const expect = require('chai').expect;
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const renderIntoDocument = ReactTestUtils.renderIntoDocument;
const scryRenderedDOMComponentsWithTag = ReactTestUtils.scryRenderedDOMComponentsWithTag;
const scryRenderedDOMComponentsWithClass = ReactTestUtils.scryRenderedDOMComponentsWithClass;

const App = require('../src/Components/App');
const initialData = {text: 'lala'};

describe.only('App', () => {
	const component = renderIntoDocument(<App />);

	it('should render div with lala content', () => {
		const headline = scryRenderedDOMComponentsWithClass(component, 'page-header');

		expect(headline).to.have.deep.property(
			'[0].textContent',
			'Retrospective w/ReactJs');
	});
});
