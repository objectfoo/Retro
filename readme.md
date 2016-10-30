# React starter

Quickie react starter.

gulp, browserify, eslint, Mocha, chai, auto reload with live-server.
Loads React and ReactDOM as browser scripts to keep them out of the bundle.

## Important
There is an html file has at `src/index.html` that has a hardcoded reference to react, this needs to be updated in sync with what get's installed with npm.

To get the version installed:

```bash
npm ls react
> react@15.3.1
```
Then update any references in `src/index.html`.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js"></script>
```


## Commands

```bash
"scripts": {
  "build": "gulp build",
  "watch": "gulp watchify",
  "live-server": "live-server --port=3004 --ignore=node_modules,src --open=/dist/",
  "test": "mocha --compilers js:babel-core/register --require ./test/test_helper.js --recursive",
  "test:watch": "npm run test -- --watch"
}
```
