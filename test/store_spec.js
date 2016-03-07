import {expect} from 'chai';

describe('store', function() {
	var store = global.store;

	describe('getState()', function() {
		it('should return state', function() {
			var state = global.store.getState();

			expect(state).to.be.an.instanceof(Object);

			expect(state).to.have.property('isSorted');
			expect(state.isSorted).to.be.false;

			expect(state).to.have.property('good');
			expect(state.good).to.be.a('Array');

			expect(state).to.have.property('bad');
			expect(state.bad).to.be.a('Array');

			expect(state).to.have.property('next');
			expect(state.next).to.be.a('Array');
		});
	});

	describe('Action - addItem', function() {

		it('should add an item to a list',function() {
			store.dispatch(actions.addItem({
				id: 'good',
				text: 'test item 1'
			}));
			var good = store.getState().good;
			expect(good.length).to.equal(1);
			expect(good[0].text).to.equal('test item 1');
		});
	});


	describe('Action - reset', function() {

		it('should reset state to inital state',function() {
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

			var state = store.getState();

			expect(state.isSorted).to.equal(false);
			expect(state.good.length).to.equal(0);
			expect(state.bad.length).to.equal(0);
			expect(state.next.length).to.equal(0);
		});
	});
});
