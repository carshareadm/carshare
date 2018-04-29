const cars = require("../controllers/cars/cars.controller");
var express = require("express");
var router = express.Router();
const isAuthenticatedGuard = require('../middleware/isAuthenticatedGuard')
const isAdminGuard = require('../middleware/isAdminGuard')

router.get("/:carId/times", cars.getTimes);
router.get("/types/:VehicleName", cars.getCarsForType);
router.get("/:carId", cars.getCar);
router.get("/:carId/image", cars.getCarImage);
router.get("/", cars.getCars);

module.exports = router;