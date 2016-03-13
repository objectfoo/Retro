import {expect} from 'chai';
const actions = global.actions;

describe('store', () => {
	const store = global.store;

	beforeEach(() => {
		store.dispatch(actions.reset());
	});

	describe('getState()', () => {
		it('should return state', () => {
			const state = global.store.getState();

			expect(state).to.be.an.instanceof(Object);

			expect(state).to.have.property('isPrintable', false);

			expect(state).to.have.property('good');
			expect(state.good).to.be.an('Array');

			expect(state).to.have.property('bad');
			expect(state.bad).to.be.an('Array');

			expect(state).to.have.property('next');
			expect(state.next).to.be.an('Array');
		});
	});

	describe('Vote', () => {
		it('should not allow a vote less than 0', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'test', vote: 3}));
			store.dispatch(actions.decrementVote({idx: 0}));
			store.dispatch(actions.decrementVote({idx: 0}));
			store.dispatch(actions.decrementVote({idx: 0}));
			const state = store.getState();

			expect(state.bad[0].vote).to.equal(0);
		});
	});

	describe('Action - addItem', () => {
		it('should add an item to a list', () => {
			store.dispatch(actions.addItem({
				id: 'good',
				text: 'test item 1'
			}));
			const good = store.getState().good;

			expect(good.length).to.equal(1);
			expect(good[0].text).to.equal('test item 1');
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
			store.dispatch(actions.addItem({id: 'next', text: 'test item 3', vote: 0}));
			store.dispatch(actions.reset());

			const state = store.getState();
			expect(state).to.have.property('isPrintable', false);
			expect(state).to.have.deep.property('good.length', 0);
			expect(state).to.have.deep.property('bad.length', 0);
			expect(state).to.have.deep.property('next.length', 0);
		});
	});

	describe('Action - sort', () => {
		it('should should sort bad items by vote descending', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'item 2', vote: 3}));
			store.dispatch(actions.addItem({id: 'bad', text: 'item 3', vote: 5}));
			store.dispatch(actions.addItem({id: 'bad', text: 'item 1', vote: 0}));

			store.dispatch(actions.sort({id: 'bad'}));
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

	describe('Action - decrementVote', () => {
		it('should increment vote of a bad item', () => {
			store.dispatch(actions.addItem({id: 'bad', text: 'test', vote: 3}));
			store.dispatch(actions.decrementVote({idx: 0}));
			const state = store.getState();

			expect(state.bad[0].vote).to.equal(2);
		});
	});

	describe.skip('Action - printable', () => {
		it('should have a test', () => {
			expect(0).to.be.ok();
		});
	});
});
