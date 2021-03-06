/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Tianqi Chen
 *               - Jason Koh
 */
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
import {Extension} from './modules/Booking/Extension';
import Locations from './modules/Locations/Locations';
import Cars from './modules/Cars/Cars';
import History from './modules/History/History';
import Damages from './modules/Damages/Damages';
import Damage from './modules/Damages/Damage';
import { Profile } from './modules/Profile/Profile';
import { DeleteProfileForm } from './modules/Profile/components/DeleteProfileForm';
import LoginForm from './modules/Login/LoginForm';
import Specials from './modules/Specials/Specials';
import Emergency from './modules/Emergency/Emergency';
import SearchResults from './modules/SearchResults/SearchResults';

import {Manage} from './modules/Manage/Manage';
import {BookingsAdm} from './modules/Manage/Bookings/BookingsAdm';
import {CarsAdm} from './modules/Manage/Cars/CarsAdm';
import {DamagesAdm} from './modules/Manage/Damages/DamagesAdm';
import {LocationsAdm} from './modules/Manage/Locations/LocationsAdm';
import {UsersAdm} from './modules/Manage/Users/UsersAdm';
import {OffersAdm} from './modules/Manage/Offer/OffersAdm';
import {EnquiriesAdm} from './modules/Manage/Enquiries/EnquiriesAdm';

import PaymentDetails from './modules/PaymentDetails/PaymentDetails';
import Unauthorised from './modules/Unauthorised/Unauthorised';

import CoordCheck from './modules/Util/CoordCheck';

import requireAuth from  './infrastructure/requireAuth';
import requireAdminAuth from  './infrastructure/requireAdminAuth';

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
		<Route path="about" component={About} />
		<Route path="faq" component={Faq} />
		<Route path="terms" component={TermsAndConditions} />
		<Route path="contact" component={Contact} />
		<Route path="register" component={Registration} />
		<Route path="login" component={LoginForm} />
		<Route path="cars" component={Cars} />
		<Route path="emergency" component={Emergency} />
		<Route path="locations" component={Locations}/>
		<Route path="specials" component={Specials} />
        <Route path='search' component={SearchResults} />
		<Route path="booking" component={requireAuth(Booking)} />
		<Route path="booking/:extend" component={requireAuth(Extension)} />
		<Route path="history" component={requireAuth(History)} />
		<Route path='paymentDetails' component={requireAuth(PaymentDetails)} />
		<Route path="profile" component={requireAuth(Profile)} />
		<Route path="profile/delete" component={requireAuth(DeleteProfileForm)} />
		<Route path='damages/:carId' component={requireAuth(Damage)} />
		<Route path='damage' component={requireAuth(Damages)} />
		{/* admin pages */}
		<Route path="manage" component={requireAdminAuth(Manage)} />
		<Route path="manage/bookings" component={requireAdminAuth(BookingsAdm)} />
		<Route path="manage/cars" component={requireAdminAuth(CarsAdm)} />
		<Route path="manage/offers" component={requireAdminAuth(OffersAdm)} />
		<Route path="manage/damages" component={requireAdminAuth(DamagesAdm)} />
		<Route path="manage/locations" component={requireAdminAuth(LocationsAdm)} />
		<Route path="manage/users" component={requireAdminAuth(UsersAdm)} />
    	<Route path="manage/enquiries" component={requireAdminAuth(EnquiriesAdm)} />

		<Route path='unauthorised' component={Unauthorised} />
		
		{/* util for testing */}
		<Route path='coordcheck' component={requireAdminAuth(CoordCheck)} />
	</Route>
);
