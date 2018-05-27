/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Tianqi Chen
 */
const offer = require("../controllers/offer/offer.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const isAbleToMakeBookingGuard = require('../middleware/isAbleToMakeBookingGuard');
var express = require("express");
var router = express.Router();

/**
 * @typedef OfferModel
 * @property {string} offerCode
 * @property {number} multiplier
 * @property {number} oneOffValue
 * @property {boolean} isDisabled
 * @property {date} expiresAt
 */

/**
 * validate an offer code for a booking attempt
 * @route PUT /offer
 * @group offer
 * @param {string} code.body.required
 * @returns {OfferModel} 200 - the valid offer object
 * @returns {Error} 400 - validation error
 * @returns {Error} 404 - offer not found
 * @returns {Error} 404 - offer expired (same as not found to foil guessing)
 * @returns {Error} 500 - internal server error
 */
router.put("/", isAuthenticatedGuard, isAbleToMakeBookingGuard, offer.validateOffer);

module.exports = router;