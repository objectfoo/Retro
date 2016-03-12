var path = require('path');
var cpFile = require('cp-file');
var rimraf = require('rimraf-then');
var destination = 'www/vendor';

console.log('*************** posinstall ***************');

deleteVendorFolder()
.then(copyReactToVendors)
.then(copyReactDomToVendors)
.then(function() {
	console.log('*********** posinstall - done ***********');
})
.catch(function(e) {
	console.log('************ posinstall - error ***********');
	console.error(e);
});



function deleteVendorFolder() {
	return rimraf(destination).then(function() {
		console.log('cleaning folder ' + destination);
	});
}

function copyReactToVendors() {
	var source = 'node_modules/react/dist/react.js';
	var dest = createDestPath(source, 'react', destination);

	return cpFile(source, dest).then(function() {
		console.log('cp', source, '>>', dest);
	});
}

function copyReactDomToVendors() {
	var source = 'node_modules/react-dom/dist/react-dom.js';
	var dest = createDestPath(source, 'react', destination);
	return cpFile(source, dest).then(function() {
		console.log('cp', source, '>>', dest);
	});
}

function createDestPath(src, parent) {
	var parts = [];

	parts.push(destination);

	if (parent !== undefined) {
		parts.push(parent);
	}
	parts.push(path.basename(src));

	return path.join.apply(path, parts);;
}
