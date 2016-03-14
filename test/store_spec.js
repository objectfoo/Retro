import {expect} from 'chai';
import store, {actions} from '../src/store.js';
import initialData, {testData} from '../src/data';

describe('store', () => {
	beforeEach(() => {
		store.dispatch(actions.reset());
	});

	describe('store.getState()', () => {
		it('should return state', () => {
			const state = store.getState();
			expect(state).to.be.an.instanceof(Object);

			expect(state).to.have.property('good').that.is.an('array');
			expect(state).to.have.property('bad').that.is.an('array');
			expect(state).to.have.property('next').that.is.an('array');
		});
	});

	describe('Vote', () => {
		it('should not allow a vote less than 0', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'test', vote: 3}));
			store.dispatch(actions.setVote({id: 'bad', idx: 0, vote: -4}));

			const state = store.getState();
			expect(state).to.have.deep.property('bad[0].vote', 0);
		});
	});

	describe('Action - addItem', () => {
		it('should add an item to a list', () => {
			store.dispatch(actions.addItem({
				id: 'good',
				text: 'test item 1'
			}));
			store.dispatch(actions.addItem({
				id: 'bad',
				text: 'test bad item 1',
				vote: 4
			}));

			const state = store.getState();
			expect(state).to.have.property('good').that.is.an('array')
				.with.deep.property('[0].text', 'test item 1');

			expect(state).to.have.property('bad').that.is.an('array')
				.with.deep.property('[0].text', 'test bad item 1');

			expect(state).to.have.deep.property('bad[0].vote', 4);
		});
	});

	describe('Action - setItemText', () => {
		it('should update text of existing item', () => {
			let bad;
			// add new item
			store.dispatch(actions.addItem({id: 'bad', text: 'start text'}));

			// verify new item
			bad = store.getState().bad;
			expect(bad[0].text).to.be.equal('start text');

			// modify item
			store.dispatch(actions.setItemText({id: 'bad', idx: '0', text: 'end text'}));
			bad = store.getState().bad;

			// verify item modified
			expect(bad[0].text).to.be.equal('end text');
		});
	});

	describe('Action - reset', () => {
		it('should reset state to inital state', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'test item 2'}));
			store.dispatch(
				actions.addItem({id: 'next', text: 'test item 3', vote: 0}));
			store.dispatch(actions.reset());

			const state = store.getState();
			expect(state).to.have.deep.property('good.length', 0);
			expect(state).to.have.deep.property('bad.length', 0);
			expect(state).to.have.deep.property('next.length', 0);
		});
	});

	describe('Action - reset with data', () => {
		it('should reset state a designated state', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'test item 2', vote: 1}));

			store.dispatch(actions.reset(testData()));

			const state = store.getState();

			expect(state).to.have.deep.property('bad.length', 2);
			expect(state).to.have.deep.property('bad[1].text', 'bad item 2');
			expect(state).to.have.deep.property('bad[1].vote', 0);
		});
	});

	describe('Action - sort', () => {
		it('should should sort bad items by vote descending', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'item 2', vote: 3}));
			store.dispatch(actions.addItem({id: 'bad', text: 'item 3', vote: 5}));
			store.dispatch(actions.addItem({id: 'bad', text: 'item 1', vote: 0}));

			store.dispatch(actions.sort());

			const bad = store.getState().bad;
			expect(bad[0]).to.have.property('vote', 0);
			expect(bad[1]).to.have.property('vote', 3);
			expect(bad[2]).to.have.property('vote', 5);
		});
	});

	describe('Action - incrementVote', () => {
		it('should increment vote of a bad item', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'test', vote: 3}));
			store.dispatch(actions.incrementVote({idx: 0}));

			const state = store.getState();
			expect(state.bad[0].vote).to.equal(4);
		});
	});

	describe('Action - setVote', () => {
		it('should increment vote of a bad item', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'test', vote: 3}));
			store.dispatch(actions.setVote({id: 'bad', idx: 0, vote: 11}));

			const state = store.getState();
			expect(state.bad[0].vote).to.equal(11);
		});
	});
});
