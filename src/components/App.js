import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import GraphPage from './GraphPage';
import Home from './Home';
import Monthly from './Monthly';
import Weekly from './Weekly';

function App({ version }) {
  return (
    <main>
      <Switch>
        <Route path='/' exact><Home version={version} /></Route>
        <Route path='/weekly'><Weekly /></Route>
        <Route path='/monthly'><Monthly /></Route>
        <Route path='/graph'><GraphPage /></Route>
        <Redirect from='*' to='/' />
      </Switch>
    </main>
  );
}

App.propTypes = {
  version: PropTypes.string.isRequired,
};

export default App;
