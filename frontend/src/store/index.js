//external imports

import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

//internal imports
import eventsReducer from './events';
import sessionReducer from './session';
import ticketsReducer from './tickets';

//root reducer
const rootReducer = combineReducers({
  events: eventsReducer,
  session: sessionReducer,
  tickets: ticketsReducer,
});

//enhancers
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;