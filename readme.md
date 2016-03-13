# Retro

Quick and dirty base of retrospective.

## npm scripts

**postinstall** cp vendor assets from node_module to  `www/browser`   
**test** run unit tests   
**test:watch**  watch files and unit test on change   
**lint** lint all files using xo   
**build** transpile all es6 src into es5 `bundle.js`   
**build:watch** watch all files transpile on change   
**live-server** call build and run auto-reloading dev server

## todo

1. convert global namespace to browserify
- move all components into their own modules
- call Voting or Plain List directly instead of using wrapper
- edit item view and toggle
- add increment vote button
- change handler for current vote input element
