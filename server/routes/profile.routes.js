const profile = require("../controllers/profile/profile.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
var express = require("express");
var router = express.Router();
/**
 * @typedef ProfileModel
 * @property {string} email
 * @property {string} mobile
 * @property {string} _id
 * @property {boolean} isAdmin
 */

/**
 * @route GET /profile/my
 * @group profile
 * @returns {ProfileModel.model} 200 
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */


router.get("/my", isAuthenticatedGuard, profile.getMyProfile);
router.post("/", isAuthenticatedGuard, profile.updateMyProfile);
router.get("/bookings", isAuthenticatedGuard, profile.bookings);

module.exports = router;