const cars = require("../controllers/cars/cars.controller");
var express = require("express");
var router = express.Router();
const isAuthenticatedGuard = require('../middleware/isAuthenticatedGuard')
const isAdminGuard = require('../middleware/isAdminGuard')

/**
 * get all cars
 * @route GET /cars
 * @group cars
 * @returns {object} 200 - array of cars
 * @returns {Error} 500 - database errors
 */
router.get("/", cars.getCars);

/**
 * get a car by id
 * @route GET /cars/{carId}
 * @group cars
 * @param {string} carId.path.required
 * @returns {object} 200 - the car
 * @returns {Error} 404 - not found
 * @returns {Error} 500 - database errors
 */
router.get("/:carId", cars.getCar);

/**
 * get times that a car is already booked, within a 1 week time frame
 * @route GET /cars/{carId}/times
 * @group cars
 * @param {string} carId.path.required
 * @param {string} start.query - if not specified, will use the start of the week as basis for weeks worth of booking times
 * @returns {object} 200 - array of times the car is booked
 * @returns {Error} 404 - not found
 * @returns {Error} 500 - database errors
 */
router.get("/:carId/times", cars.getTimes);

/**
 * search for cars of a specific vehicle type
 * @route GET /cars/types/{type}
 * @group cars
 * @param {string} type.path.required - the vehicle type
 * @returns {object} 200 - array of cars of the specified vehicle type
 * @returns {Error} 404 - not found
 * @returns {Error} 500 - database errors
 */
router.get("/types/:VehicleName", cars.getCarsForType);

module.exports = router;