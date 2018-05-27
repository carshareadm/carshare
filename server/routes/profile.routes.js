/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Tianqi Chen
 */
const profile = require("../controllers/profile/profile.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
var express = require("express");
var router = express.Router();

/**
 * @typedef AddressModel
 * @property {string} street1
 * @property {string} street2
 * @property {string} suburb
 * @property {string} state
 * @property {string} postCode
 */

/**
 * @typedef ProfileModel
 * @property {AddressModel} address
 * @property {string} license
 * @property {string} mobile
 * @property {string} email
 */

/**
 * @typedef UpdateProfileModel
 * @property {string} user
 * @property {string} email
 * @property {string} mobile
 * @property {string} licenseNumber
 * @property {string} password
 * @property {string} street1
 * @property {string} street2
 * @property {string} suburb
 * @property {string} state
 * @property {string} postCode
 */

/**
 * @typedef BookingCarLocation
 * @property {string} _id
 * @property {string} coordinates
 * @property {string} name
 * @property {boolean} isDisabled
 */

/**
 * @typedef BookingCarVehicleType
 * @property {string} _id
 * @property {number} hourlyRate
 * @property {string} name
 */

/**
 * @typedef BookingCarDamage
 * @property {string} _id
 * @property {string} description
 * @property {date} loggedAt
 * @property {string} booking
 * @property {string} car
 * @property {string} image
 * @property {string} imageUrl
 * @property {boolean} isDisabled:
 */

/**
 * @typedef BookingCarModel
 * @property {string} _id
 * @property {number} doors
 * @property {number} seats
 * @property {number} year
 * @property {string} colour
 * @property {string} model
 * @property {string} make
 * @property {string} rego
 * @property {boolean} isDisabled
 * @property {BookingCarDamage.array} damages
 * @property {BookingCarLocation.model} location
 * @property {BookingCarVehicleType.model} vehicleType
 */

/**
 * @typedef BookingHistoryModel
 * @property {string} _id
 * @property {number} totalCost
 * @property {number} unlockCode
 * @property {string} user
 * @property {date} endsAt
 * @property {date} startsAt
 * @property {BookingCarModel} car
 */

/**
 * get the current logged in user's profile
 * @route GET /profile/my
 * @group profile
 * @returns {ProfileModel.model} 200 
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.get("/my", isAuthenticatedGuard, profile.getMyProfile);

/**
 * update the current logged in user's profile.
 * only fields that have been altered are POSTed.
 * @route POST /profile
 * @group profile
 * @param {UpdateProfileModel.model} UpdateProfileModel.body.required
 * @returns {ProfileModel.model} 200 
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.post("/", isAuthenticatedGuard, profile.updateMyProfile);

/**
 * get the current logged in user's booking history
 * @route GET /bookings
 * @group profile
 * @returns {BookingHistoryModel.model} 200 
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 500 - internal server error
 */
router.get("/bookings", isAuthenticatedGuard, profile.bookings);

/**
 * set the current user's account to disabled.
 * prepend their email with a datestamp and self_deleted to avoid potential issues with reregistration later
 * @route DELETE /profile/delete
 * @group profile
 * @returns {} 200 - DELETED
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.delete("/delete", isAuthenticatedGuard, profile.deleteMyAccount);

module.exports = router;