const movement = require("../controllers/movement/movement.controller");
var express = require("express");
var router = express.Router();

/**
 * @typedef MovementModel
 * @property {string} car
 * @property {string} latitude
 * @property {string} longitude
 */

/**
 * log a latitiude and longitude for a vehicle. this is not triggered in the app currently,
 * but is more of an example of what the hardware in the car would send once a booking is finished.
 * @route POST /movement
 * @group movement
 * @param {MovementModel.model} MovementModel.body.required
 * @returns {object} 200 - the saved movement object
 * @returns {Error} 500 - tinternal server error
 */
router.post('/create', movement.createMovement);

module.exports = router;