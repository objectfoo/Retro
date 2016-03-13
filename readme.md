# Retro

Quick and dirty base of retrospective.

## npm scripts

* `postinstall`
	* cp vendor assets from node_module to `www/browser`
* `test`
	* run unit tests
* `test:watch`
	* watch all files and lint on change
* `lint`
	* lint all files using xo
* `build`
	* transpile all es6 src into es5 `bundle.js`
* `build:watch`
	* watch all files transpile on change
* `live-server`
	* call build and run auto-reloading dev server

## Issues

* Don't like the global names space thing I've got going on, time for browserify may be coming up.
* Don't like the composite List component, need to just have 2 Components and call it accordingly.
