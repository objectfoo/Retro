'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Store from './Store';

const document = global.document;
const hostElement = document.getElementById('app');
const store = new Store();

ReactDOM.render(<App store={store}/>, hostElement);
hostElement.classList.remove('preload');
