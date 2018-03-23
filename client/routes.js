/* eslint-disable global-require */
import React from 'react';
import { Route } from 'react-router';
import { IndexRoute } from 'react-router'

/* Pages modules are imported here */
import Layout from './modules/Layout/Layout';
import Faq from './modules/Faq/Faq';
import Home from './modules/Home/Home';
import TermsAndConditions from './modules/TermsAndConditions/TermsAndConditions';
import Contact from './modules/Contact/Contact';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

if (process.env.NODE_ENV !== 'production') {

}

/* Pages paths are connected here */
export default (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route path="faq" component={Faq} />
		<Route path="terms" component={TermsAndConditions} />
		<Route path="contactus" component={Contact} />
	</Route>
);
