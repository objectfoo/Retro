const expect = require('chai').expect;
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const renderIntoDocument = ReactTestUtils.renderIntoDocument;
const scryRenderedDOMComponentsWithTag = ReactTestUtils.scryRenderedDOMComponentsWithTag;
const scryRenderedDOMComponentsWithClass = ReactTestUtils.scryRenderedDOMComponentsWithClass;

const App = require('../src/Components/App');
const initialData = {text: 'lala'};

describe('App', () => {
	const component = renderIntoDocument(<App />);

	it('should render div with lala content', () => {
		const headline = scryRenderedDOMComponentsWithClass(component, 'page-header');
		expect(headline).to.have.deep.property(
			'[0].textContent',
			'Retrospective w/ReactJs');
	});

	it('should have 1 input for each of the 3 sections', () => {
		const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
		expect(inputs).to.have.property('length', 3);
		expect(inputs[0].placeholder).to.equal('What went well?');
		expect(inputs[1].placeholder).to.equal('What needs improvement?');
		expect(inputs[2].placeholder).to.equal('What do we do next time?');
	});
});
