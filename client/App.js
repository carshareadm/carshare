/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Tianqi Chen
 */

/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

// Import Routes
import routes from './routes';

// Style sheet for react-datepicker package
import 'react-datepicker/dist/react-datepicker.css';

// Base stylesheet
require('./main.css');


export default function App(props) {
  return (
    <Provider store={props.store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
