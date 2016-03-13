import {expect} from 'chai';
const actions = global.actions;

describe('store', () => {
	const store = global.store;

	describe('getState()', () => {
		it('should return state', () => {
			const state = global.store.getState();

			expect(state).to.be.an.instanceof(Object);

			expect(state).to.have.property('isSorted');
			expect(state.isSorted).to.equal(false);

			expect(state).to.have.property('good');
			expect(state.good).to.be.a('Array');

			expect(state).to.have.property('bad');
			expect(state.bad).to.be.a('Array');

			expect(state).to.have.property('next');
			expect(state.next).to.be.a('Array');
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
			store.dispatch(actions.addItem({
				id: 'bad',
				text: 'start text'
			}));

			// verify item added
			bad = store.getState().bad;
			expect(bad[0].text).to.be.equal('start text');

			// modify item
			store.dispatch(actions.setItemText({
				id: 'bad',
				idx: '0',
				text: 'end text'
			}));
			bad = store.getState().bad;

			// verify item modified
			expect(bad[0].text).to.be.equal('end text');
		});
	});

	describe('Action - reset', () => {
		it('should reset state to inital state', () => {
			store.dispatch(actions.addItem({
				id: 'bad',
				text: 'test item 2'
			}));
			store.dispatch(actions.addItem({
				id: 'next',
				text: 'test item 3',
				vote: 0
			}));
			store.dispatch(actions.reset());

			const state = store.getState();

			expect(state.isSorted).to.equal(false);
			expect(state.good.length).to.equal(0);
			expect(state.bad.length).to.equal(0);
			expect(state.next.length).to.equal(0);
		});
	});

	describe.skip('Action - sort', () => {
		it('should have a test', () => {
			expect(0).to.be.ok();
		});
	});

	describe.skip('Action - setVote', () => {
		it('should have a test', () => {
			expect(0).to.be.ok();
		});
	});

	describe.skip('Action - printable', () => {
		it('should have a test', () => {
			expect(0).to.be.ok();
		});
	});
});
