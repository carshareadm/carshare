const offer = require("../controllers/offer/offer.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const isAbleToMakeBookingGuard = require('../middleware/isAbleToMakeBookingGuard');
var express = require("express");
var router = express.Router();

router.post("/", isAuthenticatedGuard, isAbleToMakeBookingGuard, offer.validateOffer);

module.exports = router;