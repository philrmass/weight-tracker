import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { registerServiceWorker } from './utilities/serviceWorker';
import './styles/normalize.css';
import './styles/index.css';
import store from './redux/store';
import App from './components/App';

const version = '0.13.0';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App version={version} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);

registerServiceWorker();

console.log(`Weight Tracker ${version}`);
