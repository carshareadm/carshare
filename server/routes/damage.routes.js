const damage = require("../controllers/damage/damage.controller");
var express = require("express");
var router = express.Router();

/**
 * @typedef ReportDamageModel
 * @property {string} description - description of the damage
 * @property {string} image - id of uploaded image
 */

/**
 * record damage to a car against a booking
 * @route POST /damage/{booking}/createDamage
 * @group damage
 * @param {string} booking.path.required -  the id of the booking
 * @param {ReportDamageModel.model} ReportDamageModel.body.required
 * @returns {object} 200 - the saved damage object
 * @returns {Error} 500 - internal server error
 */
router.post('/:booking/createDamage', damage.createDamage);

/**
 * get the reported damage for a car
 * @route GET /damage/{carId}/showDamage
 * @group damage
 * @param {string} carId.path.required -  the id of the booking
 * @returns {Array} 200 - array of damages for car
 * @returns {Error} 500 - internal server error
 */
router.get('/:carId/showDamage', damage.showDamage);

module.exports = router;
