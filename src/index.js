import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { registerServiceWorker } from './utilities/serviceWorker';
import './styles/normalize.css';
import './styles/index.css';
import store from './redux/store';
import App from './components/App';

const version = '0.9.0';

ReactDOM.render(
  <Provider store={store}>
    <App version={version} />
  </Provider>,
  document.getElementById('app'),
);

registerServiceWorker();

console.log(`Weight Tracker ${version}`);
