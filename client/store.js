/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 */
/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export function configureStore(initialState = { loggedIn: false, isAdmin: false }) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
  ];

  const store = createStore(rootReducer, initialState, compose(...enhancers));

  // For hot reloading reducers
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
