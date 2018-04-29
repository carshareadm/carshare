const cars = require("../controllers/manage/manage.cars.controller");
const locations = require("../controllers/manage/manage.locations.controller");
const vehicleTypes = require("../controllers/manage/manage.vehicleTypes.controller");
const users = require("../controllers/manage/manage.users.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const isAdminGuard = require("../middleware/isAdminGuard");

var express = require("express");
var router = express.Router();

router.get("/cars", isAuthenticatedGuard, isAdminGuard, cars.getAll);
router.put("/cars/:carId", isAuthenticatedGuard, isAdminGuard, cars.update);

router.get("/vehicletypes", isAuthenticatedGuard, isAdminGuard, vehicleTypes.getAll);

router.get("/locations", isAuthenticatedGuard, isAdminGuard, locations.getAll);
router.put("/locations/:locationId", isAuthenticatedGuard, isAdminGuard, locations.update);

router.get("/users", isAuthenticatedGuard, isAdminGuard, users.getAll);
router.put("/users/:userId", isAuthenticatedGuard, isAdminGuard, users.update);

module.exports = router;