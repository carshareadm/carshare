const cars = require("../controllers/manage/manage.cars.controller");
const locations = require("../controllers/manage/manage.locations.controller");
const users = require("../controllers/manage/manage.users.controller");
const bookings = require("../controllers/manage/manage.bookings.controller");
const offers = require("../controllers/manage/manage.offers.controller");
const vehicleTypes = require("../controllers/manage/manage.vehicleTypes.controller");
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

router.get("/bookings", isAuthenticatedGuard, isAdminGuard, bookings.getAll);
router.put("/bookings/:bookingId", isAuthenticatedGuard, isAdminGuard, bookings.update);

router.get("/offers", isAuthenticatedGuard, isAdminGuard, offers.getAll);
router.put("/offers/:offerId", isAuthenticatedGuard, isAdminGuard, offers.update);

module.exports = router;