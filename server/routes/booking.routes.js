const booking = require("../controllers/booking/booking.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
var express = require("express");
var router = express.Router();

router.post("/check", isAuthenticatedGuard, booking.checkBooking);
router.post("/", isAuthenticatedGuard, booking.createBooking);
router.post("/cancel", isAuthenticatedGuard, booking.cancelBooking);
router.get("/get", isAuthenticatedGuard, booking.getBooking);
router.post("/change", isAuthenticatedGuard, booking.changeBooking);

module.exports = router;