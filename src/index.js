import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/normalize.css';
import './styles/index.css';
import store from './redux/store';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

console.log('Weight Tracker 0.0.1');
serviceWorker.register();
