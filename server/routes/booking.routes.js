const booking = require("../controllers/booking/booking.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const isAbleToMakeBookingGuard = require('../middleware/isAbleToMakeBookingGuard');
var express = require("express");
var router = express.Router();

/**
 * @typedef BookingModel
 * @property {Date} startAt.required
 * @property {Date} endAt.required
 * @property {string} car.required
 * @property {string} userid.required
 */

/**
 * @typedef CancelBookingModel
 * @property {string} bookingid.required
 * @property {string} userid.required
 */

/**
 * @typedef ChangeBookingModel
 * @property {Date} startAt.required
 * @property {Date} endAt.required
 * @property {string} car.required
 * @property {string} userid.required
 * @property {string} bookingid.required
 */

/**
 * @typedef ExtendBookingModel
 * @property {Date} startAt.required
 * @property {Date} endAt.required
 * @property {string} bookid.required
 */

/**
 * create a booking
 * @route POST /booking
 * @group booking
 * @param {BookingModel.model} BookingModel.body.required
 * @returns {object} 200 - new booking
 * @returns {Error} 400 - validation errors
 * @returns {Error} 404 - User or Car not found
 * @returns {Error} 500 - database errors
 */
router.post("/", isAuthenticatedGuard, isAbleToMakeBookingGuard, booking.createBooking);

/**
 * cancel a booking if it has not alraedy started
 * @route PUT /booking/cancel
 * @group booking
 * @param {CancelBookingModel.model} CancelBookingModel.body.required
 * @returns {} 200 - new booking
 * @returns {Error} 400 - validation errors, booking time clashes
 * @returns {Error} 403 - no cancelling someone else's booking
 * @returns {Error} 404 - Booking not found
 * @returns {Error} 500 - database errors
 */
router.put("/cancel", isAuthenticatedGuard, booking.cancelBooking);

/**
 * get a booking by id
 * @route GET /booking/{bookingid}
 * @group booking
 * @param {string} bookingid.path.required
 * @returns {object} 200 - the booking
 * @returns {Error} 400 - validation errors
 * @returns {Error} 500 - database errors
 */
router.get("/:bookingid", isAuthenticatedGuard, booking.getBooking);

/**
 * change a booking **may not be used**
 * @route PUT /booking/change
 * @group booking
 * @param {ChangeBookingModel.model} ChangeBookingModel.body.required
 * @returns {} 200 - OK
 * @returns {Error} 400 - validation errors, booking time clashes
 * @returns {Error} 404 - Booking not found
 * @returns {Error} 500 - database errors
 */
router.put("/change", isAuthenticatedGuard, booking.changeBooking);

/**
 * extend a booking if there is time available to extend into
 * @route PUT /booking/extend
 * @group booking
 * @param {ExtendBookingModel.model} ExtendBookingModel.body.required
 * @returns {object} 200 - extended booking
 * @returns {Error} 400 - validation errors, booking time clashes
 * @returns {Error} 404 - Booking not found
 * @returns {Error} 500 - database errors
 */
router.put("/extend", isAuthenticatedGuard, isAbleToMakeBookingGuard, booking.extendBooking);

module.exports = router;