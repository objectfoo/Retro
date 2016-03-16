'use strict';

function initialData() {
	return {
		isPrintable: false,
		good: [],
		bad: [],
		next: []
	};
}

function testData() {
	const d = initialData();

	d.bad = [
		{text: 'bad item 1 Instantly break out into full speed gallop across the house for no reason. Chase imaginary bugs stand in front of the computer screen, fall over dead (not really but gets sypathy), has closed eyes but still sees you or bathe private parts with tongue then lick owner\'s face. ', vote: 0},
		{text: 'bad item 2', vote: 0}
	];

	d.good = [
		{text: 'good item 1'},
		{text: 'good item 2 Meowing non stop for food i am the best, meowwww lay on arms while you\'re using the keyboard, for sit by the fire, chase dog then run away. Lick plastic bags. '}
	];

	d.next = [
		{text: 'next item 1'},
		{text: 'next item 2'}
	];

	return d;
}

export {initialData as default, testData};

// 	const items = ['item 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'item 2'];
// 	const voteItems = [
// 		{text: 'asdf', vote: 0},
// 		{text: 'asdf asdf asd fasd', vote: 1}
// 	];
