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
	console.error(e);
});



function deleteVendorFolder() {
	return rimraf(destination).then(function() {
		console.log('cleaning folder ' + destination);
	});
}

function copyReactToVendors() {
	var p = createDestPath('node_modules/react/dist/react.js'
		, 'react'
		, destination
	);

	return cpFile('node_modules/react/dist/react.js', p).then(function() {
		console.log('react copied to ' + p);
	});
}

function copyReactDomToVendors() {
	var p = createDestPath('node_modules/react/dist/react.js'
		, 'react'
		, destination
	);
	return cpFile('node_modules/react-dom/dist/react-dom.js', p).then(function() {
		console.log('react-dom copied to ' + p);
	});
}

createDestPath('node_modules/react/dist/react.js');
function createDestPath(src, parent) {
	var s = path.parse(src);
	var dest;
	var parts = [];

	parts.push(destination);

	if (parent !== undefined) {
		parts.push(parent);
	}
	parts.push(s.base);
	dest = path.join.apply(path, parts);

	return dest;
}
