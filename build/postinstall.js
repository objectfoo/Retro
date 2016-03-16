const path = require('path');
const cpFile = require('cp-file');
const rimraf = require('rimraf-then');
const destination = 'dist/vendor';

console.log('*************** posinstall ***************');

deleteVendorFolder()
.then(copyReactToVendors)
.then(copyReactDomToVendors)
.then(() => {
	console.log('*********** posinstall - done ***********');
})
.catch(e => {
	console.log('************ posinstall - error ***********');
	console.error(e);
});

function deleteVendorFolder() {
	return rimraf(destination).then(() => {
		console.log(`cleaning folder ${destination}`);
	});
}

function copyReactToVendors() {
	const source = 'node_modules/react/dist/react.js';
	const dest = createDestPath(source, 'react', destination);

	return cpFile(source, dest).then(() => {
		console.log('cp', source, '>>', dest);
	});
}

function copyReactDomToVendors() {
	const source = 'node_modules/react-dom/dist/react-dom.js';
	const dest = createDestPath(source, 'react', destination);
	return cpFile(source, dest).then(() => {
		console.log('cp', source, '>>', dest);
	});
}

function createDestPath(src, parent) {
	const parts = [];

	parts.push(destination);

	if (parent !== undefined) {
		parts.push(parent);
	}
	parts.push(path.basename(src));

	return path.join.apply(path, parts);
}
