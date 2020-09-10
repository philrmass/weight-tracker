import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import weightsReducer from './weights/reducer';

const rootReducer = combineReducers({
  weights: weightsReducer,
});

export default createStore(
  rootReducer,
  {},
  applyMiddleware(thunk),
);
