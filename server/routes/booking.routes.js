const booking = require("../controllers/booking/booking.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const isAbleToMakeBookingGuard = require('../middleware/isAbleToMakeBookingGuard');
var express = require("express");
var router = express.Router();

router.post("/", isAuthenticatedGuard, isAbleToMakeBookingGuard, booking.createBooking);
router.post("/cancel", isAuthenticatedGuard, booking.cancelBooking);
router.get("/get", isAuthenticatedGuard, booking.getBooking);
router.post("/change", isAuthenticatedGuard, booking.changeBooking);

module.exports = router;