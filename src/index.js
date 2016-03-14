'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import {store} from './Store';

const document = global.document;
const hostElement = document.getElementById('app');

ReactDOM.render(<App store={store}/>, hostElement);
hostElement.classList.remove('preload');
