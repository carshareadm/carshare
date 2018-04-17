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
import Registration from './modules/Registration/Registration';
import About from './modules/About/About';
import Booking from './modules/Booking/Booking';
import Locations from './modules/Locations/Locations';
import Cars from './modules/Cars/Cars';
import History from './modules/History/History';
import { Profile } from './modules/Profile/Profile';
import { Login } from './modules/Login/Login';

import {Manage} from './modules/Manage/Manage';
import PaymentDetails from './modules/PaymentDetails/PaymentDetails';

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
		<Route path="contact" component={Contact} />
		<Route path="register" component={Registration} />
		<Route path="about" component={About} />
		<Route path="booking" component={Booking} />
		<Route path="manage" component={Manage} />
		<Route path="cars" component={Cars} />
    	<Route path="locations" component={Locations}/>
		<Route path="profile" component={Profile} />
		<Route path="history" component={History} />
		<Route path="login" component={Login} />
    	<Route path='paymentDetails' component={PaymentDetails} />
	</Route>
);
