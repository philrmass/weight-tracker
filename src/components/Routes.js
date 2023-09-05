import { Router } from 'preact-router';
import { createHashHistory } from 'history';
import Home from './Home';
import Redirect from './Redirect';
// ??? restore routes
// import GraphPage from './GraphPage';
// import Monthly from './Monthly';
// import Weekly from './Weekly';

export default function Routes() {
  return (
    <Router history={createHashHistory()}>
      <Home path="/" />
      <Redirect default to="/" />
      {/*
        <Route path='/weight-tracker/weekly'><Weekly /></Route>
        <Route path='/weight-tracker/monthly'><Monthly /></Route>
        <Route path='/weight-tracker/graph'><GraphPage /></Route>
        */}
    </Router>
  );
}
