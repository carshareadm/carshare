const booking = require("../controllers/booking/booking.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const isAbleToMakeBookingGuard = require('../middleware/isAbleToMakeBookingGuard');
var express = require("express");
var router = express.Router();

router.put("/", isAuthenticatedGuard, isAbleToMakeBookingGuard, booking.createBooking);
router.put("/cancel", isAuthenticatedGuard, booking.cancelBooking);
router.get("/:bookingid", isAuthenticatedGuard, booking.getBooking);
router.put("/change", isAuthenticatedGuard, booking.changeBooking);
router.put("/extend", isAuthenticatedGuard, isAbleToMakeBookingGuard, booking.extendBooking);

module.exports = router;