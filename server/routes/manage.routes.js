/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 *               - Tianqi Chen
 *               - Jason Koh
 */
const cars = require("../controllers/manage/manage.cars.controller");
const locations = require("../controllers/manage/manage.locations.controller");
const users = require("../controllers/manage/manage.users.controller");
const bookings = require("../controllers/manage/manage.bookings.controller");
const offers = require("../controllers/manage/manage.offers.controller");
const damages = require("../controllers/manage/manage.damages.controller");
const vehicleTypes = require("../controllers/manage/manage.vehicleTypes.controller");
const enquiries = require("../controllers/manage/manage.enquiries.controller.js")
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const isAdminGuard = require("../middleware/isAdminGuard");

var express = require("express");
var router = express.Router();

/**
 * @typedef ManageCarRequestModel
 * @property {string} rego.required
 * @property {string} make.required
 * @property {string} model.required
 * @property {string} colour.requied
 * @property {Number} year.required
 * @property {Number} seats.required
 * @property {Number} doors.required
 * @property {string} vehicleType.required
 * @property {string} location.required
 * @property {string} image
 * @property {boolean} isDisabled
 */

/**
 * @typedef ManageCarStatsModel
 * @property {Number} total
 * @property {Number} smallActive
 * @property {Number} sportsActive
 * @property {Number} luxuryActive
 * @property {Number} suvActive
 * @property {Number} inactive
 */

/**
 * get all cars.
 * requires admin.
 * @route GET /manage/cars get all cars
 * @group manage cars
 * @returns {ManageCarRequestModel} 200 - an array of cars
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 500 - internal server error
 */
router.get("/cars", isAuthenticatedGuard, isAdminGuard, cars.getAll);

/**
 * create a new car.
 * requires admin.
 * @route POST /manage/cars
 * @group manage cars
 * @param {ManageCarRequestModel.model} ManageCarRequestModel.body.required
 * @returns {ManageCarRequestModel} 200 - the created car
 * @returns {Error} 400 - validation errors
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 500 - internal server error
 */
router.post("/cars", isAuthenticatedGuard, isAdminGuard, cars.create);

/**
 * get statistics for cars.
 * requires admin.
 * @route GET /manage/cars/stats
 * @group manage cars
 * @returns {ManageCarStatsModel} 200 - an dictionary of stat names and values
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 500 - internal server error
 */
router.get("/cars/stats", isAuthenticatedGuard, isAdminGuard, cars.stats);

/**
 * update a single car.
 * requires admin.
 * @route PUT /manage/cars/{carId}
 * @group manage cars
 * @param {string} carId.path.required
 * @param {ManageCarRequestModel.model} ManageCarRequestModel.body.required
 * @returns {object} 200 - the updated car
 * @returns {Error} 400 - validation errors
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 404 - car not found
 * @returns {Error} 500 - internal server error
 */
router.put("/cars/:carId", isAuthenticatedGuard, isAdminGuard, cars.update);

/**
 * update the image for a single car.
 * requires admin.
 * @route PUT /manage/cars/{carId}/image/{imageId}
 * @group manage cars
 * @param {string} carId.path.required
 * @param {string} imageId.path.required
 * @param {ManageCarRequestModel.model} CarModel.body.required
 * @returns {object} 200 - the updated car
 * @returns {Error} 400 - validation errors
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 404 - car not found
 * @returns {Error} 404 - image not found
 * @returns {Error} 500 - internal server error
 */
router.put("/cars/:carId/image/:imageId", isAuthenticatedGuard, isAdminGuard, cars.updateImage);

/**
 * @typedef ManageDamageModel
 * @property {string} description
 * @property {Date} loggetAt
 * @property {object} booking
 * @property {object} car
 * @property {object} image
 * @property {string} imageUrl
 * @property {boolean} isDisabled
 */

/**
 * @typedef DamageStatsModel
 * @property {Number} allReported
 * @property {Number} resolved
 * @property {Number} outstanding
 * @property {Number} totalDamagedCars
 * @property {Number} unresolvedDamagedCars
 */

/**
 * get all damages.
 * requires admin.
 * @route GET /manage/damages
 * @group manage damages
 * @param {string} carId.query - an optional argument to restrict damages to a single car
 * @returns {ManageDamageModel.model} 200 - an array of reported damages
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 500 - internal server error
 */
router.get("/damages", isAuthenticatedGuard, isAdminGuard, damages.getAll);

/**
 * get statistics for damages
 * requires admin.
 * @route GET /manage/damages/stats
 * @group manage damages
 * @returns {DamageStatsModel.model} 200 - dictionary of stat names and values
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 500 - internal server error
 */
router.get("/damages/stats", isAuthenticatedGuard, isAdminGuard, damages.stats);

/**
 * update a reported damage isDisabled status, to mark whether it has been resolved.
 * requires admin.
 * @route PUT /manage/damages/{damageId}
 * @group manage damages
 * @param {string} damageId.path.required - the id of the reported damage
 * @returns {object} 200 - the updated reported damage
 * @returns {Error} 401 - user is not an admin
 * @returns {Error} 500 - internal server error

 */
router.put("/damages/:damageId", isAuthenticatedGuard, isAdminGuard, damages.update);

/**
 * @typedef ManageVehicleTypeModel
 * @property {string} _id
 * @property {string} name
 * @property {number} hourlyRate
 */

/**
 * get a list of vehicle types
 * @route GET /manage/vehicletypes
 * @group manage vehicletypes
 * @returns {ManageVehicleTypeModel.model} 200 - array of vehicle types
 * @returns {Error} 500 - internal server error
 * @example "[{\"_id\": \"some_id\", \"name\": \"small\", \"hourlyRate\": 7.50}]"
 */
router.get("/vehicletypes", isAuthenticatedGuard, isAdminGuard, vehicleTypes.getAll);

/**
 * @typedef ManageCoordinatesModel
 * @property {string} _id
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef ManageLocationsModel
 * @property {string} _id
 * @property {string} name
 * @property {ManageCoordinatesModel} coordinates
 * @property {boolean} isDisabled
 */

/**
 * @typedef ManageLocationStatsModel
 * @property {number} total
 * @property {number} inactive
 * @property {number} carsActiveLocations
 * @property {number} carsInactiveLocations
 * @property {number} assignedToCars
 */

/**
 * get list of locations
 * @route GET /manage/locations
 * @group manage locations
 * @returns {ManageLocationsModel.model} 200 - array of locations
 * @returns {Error} 500 - internal server error
 */
router.get("/locations", isAuthenticatedGuard, isAdminGuard, locations.getAll);

/**
 * get location based stats
 * @route GET /manage/locations/stats
 * @group manage locations
 * @returns {ManageLocationStatsModel.model} 200 - dictionary of stat names and values
 * @returns {Error} 500 - internal server error
 */
router.get("/locations/stats", isAuthenticatedGuard, isAdminGuard, locations.stats);

/**
 * create a new Location with Coordinates
 * @route POST /manage/locations
 * @group manage locations
 * @param {ManageLocationsModel.model} ManageLocationsModel.body.required
 * @returns {ManageLocationsModel.model} 200 - the new location
 * @returns {Error} 400 - invalid coordinates
 * @returns {Error} 400 - invalid location
 * @returns {Error} 500 - internal server error
 */
router.post("/locations", isAuthenticatedGuard, isAdminGuard, locations.create);

/**
 * create a new Location with Coordinates
 * @route PUT /manage/locations/{locationId}
 * @group manage locations
 * @param {string} locationId.path.required
 * @param {ManageLocationsModel.model} ManageLocationsModel.body.required
 * @returns {ManageLocationsModel.model} 200 - the new location
 * @returns {Error} 400 - invalid coordinates
 * @returns {Error} 400 - invalid location
 * @returns {Error} 500 - internal server error
 */
router.put("/locations/:locationId", isAuthenticatedGuard, isAdminGuard, locations.update);

/**
 * @typedef ManageUserStatsModel
 * @property {number} total
 * @property {number} inactive
 * @property {number} nonAdmin
 * @property {number} pendingApproval
 */

/**
 * @typedef ManageUserLicenseModel
 * @property {string} _id 
 * @property {string} licenseNumber 
 * @property {string} image
 * @property {boolean} isDisabled
 * @property {boolean} approvedByAdmin
 */

/**
 * @typedef ManageUserModel
 * @property {string} _id
 * @property {string} email
 * @property {string} mobile
 * @property {ManageUserLicenseModel.model} license
 * @property {string} address
 * @property {string} creditCard
 * @property {boolean} isAccountConfirm
 * @property {boolean} isAdmin
 * @property {boolean} isDisabled
 * @property {boolean} isBlockedByAdmin
 */

 /**
 * get non admin users
 * @route GET /manage/users
 * @group manage users
 * @returns {ManageUserModel.model} 200 - array of non admin users
 * @returns {Error} 500 - internal server error
 */
router.get("/users", isAuthenticatedGuard, isAdminGuard, users.getAll);

/**
 * get user based stats
 * @route GET /manage/users/stats
 * @group manage users
 * @returns {ManageUserStatsModel.model} 200 - dictionary of stat names and values
 * @returns {Error} 500 - internal server error
 */
router.get("/users/stats", isAuthenticatedGuard, isAdminGuard, users.stats);

 /**
 * update non admin user by id
 * @route PUT /manage/users/{userId}
 * @group manage users
 * @param {string} userId.path.required
 * @param {ManageUserModel.model} ManageUserModel.body.required
 * @returns {ManageUserModel.model} 200 - updated user
 * @returns {Error} 500 - internal server error
 */
router.put("/users/:userId", isAuthenticatedGuard, isAdminGuard, users.update);

/**
 * @typedef ManageBookingOfferModel
 * @property {string} _id
 * @property {string} offerCode
 * @property {number} multiplier
 * @property {number} oneOffValue
 * @property {boolean} isDisabled
 * @property {date} expiresAt
 */

/**
 * @typedef ManageBookingCarModel
 * @property {string} _id
 * @property {string} rego 
 * @property {string} make
 * @property {string} model
 * @property {string} colour
 * @property {number} year
 * @property {number} seats
 * @property {number} doors
 * @property {string} vehicleType
 * @property {string} location
 * @property {string} image
 * @property {boolean} isDisabled 
 */

/**
 * @typedef ManageBookingUserModel
 * @property {string} _id
 * @property {string} email
 * @property {string} mobile
 * @property {boolean} isAdmin
 * @property {boolean} isAccountConfirmed
 * @property {boolean} isDisabled
 * @property {boolean} isBlockedByAdmin
 * @property {string} license
 * @property {string} address
 * @property {string} creditCard
 */

/**
 * @typedef ManageBookingModel
 * @property {string} _id
 * @property {date} unlockCode
 * @property {date} startsAt
 * @property {date} endsAt
 * @property {string} lastAccessAt
 * @property {boolean} isDisabled
 * @property {number} totalCost
 * @property {ManageBookingUserModel.model} user
 * @property {ManageBookingCarModel.model} car
 * @property {ManageBookingOfferModel.model} offer
 */

/**
 * @typedef ManageBookingStatsModel
 * @property {number} total
 * @property {number} cancelled
 * @property {number} upcoming
 * @property {number} inProgress
 */

/**
 * @typedef ManageBookingUpdateModel
 * @property {string} car
 * @property {date} startsAt
 * @property {date} endsAt
 * @property {string} user
 * @property {string} unlockCode
 * @property {string} offer
 * @property {boolean} isDisabled
 */

/**
 * get a list of bookings, with user, car and offer models
 * @route GET /manage/bookings
 * @group manage bookings
 * @returns {ManageBookingModel.model} 200 - array of ManageBookingModel
 * @returns {Error} 500 - internal server error
 */
router.get("/bookings", isAuthenticatedGuard, isAdminGuard, bookings.getAll);

/**
 * get bookings based stats
 * @route GET /manage/bookings/stats
 * @group manage bookings
 * @returns {ManageBookingStatsModel.model} 200 - ManageBookingStatsModel
 * @returns {Error} 500 - internal server error
 */
router.get("/bookings/stats", isAuthenticatedGuard, isAdminGuard, bookings.stats);

/**
 * updat a booking
 * @route PUT /manage/bookings/{bookingId}
 * @group manage bookings
 * @param {string} bookingId.path.required
 * @param {ManageBookingUpdateModel.model} ManageBookingUpdateModel.body.required
 * @returns {object} 200 - updated booking
 * @returns {Error} 400 - vehicle not found
 * @returns {Error} 404 - booking not found
 * @returns {Error} 500 - internal server error
 */
router.put("/bookings/:bookingId", isAuthenticatedGuard, isAdminGuard, bookings.update);

/**
 * @typedef ManageOfferModel
 * @property {string} _id
 * @property {string} offerCode
 * @property {number} multiplier
 * @property {number} oneOffValue
 * @property {boolean} isDisabled
 * @property {date} expiresAt
 */

/**
 * get all offers
 * @route GET /manage/offers
 * @group manage offers
 * @returns {ManageOfferModel.model} 200 - array of ManageOfferModel
 * @returns {Error} 500 - internal server error
 */
router.get("/offers", isAuthenticatedGuard, isAdminGuard, offers.getAll);

/**
 * update an offer
 * @route PUT /manage/offers/{offerId}
 * @group manage offers
 * @param {string} offerId.path.required
 * @param {ManageOfferModel.model} ManageOfferModel.body.required
 * @returns {ManageOfferModel.model} 200 - ManageOfferModel
 * @returns {Error} 404 - offer not found
 * @returns {Error} 500 - internal server error
 */
router.put("/offers/:offerId", isAuthenticatedGuard, isAdminGuard, offers.update);

/**
 * create an offer
 * @route POST /manage/offers
 * @group manage offers
 * @param {ManageOfferModel.model} ManageOfferModel.body.required
 * @returns {ManageOfferModel.model} 200 - array of ManageOfferModel
 * @returns {Error} 400 - validation errs
 * @returns {Error} 500 - internal server error
 */
router.post("/offers", isAuthenticatedGuard, isAdminGuard, offers.add);

/**
 * @typedef ManageEnquiryModel
 * @property {string} emailFrom
 * @property {string} name
 * @property {string} message
 * @property {string} response
 * @property {date} receivedAt
 * @property {date} responseAt
 * @property {string} priority
 */
/**
 * @typedef ManageEnquiryUpdateModel
 * @property {string} response
 */

 /**
 * @typedef ManageEnquiryStatsModel
 * @property {number} total
 * @property {number} resolved
 * @property {number} last24Hours
 * @property {number} last7Days 
 */

/**
 * get all enquiries that have not been responded to
 * @route GET /manage/enquiries
 * @group manage enquiries
 * @returns {ManageEnquiryModel.model} 200 - array of ManageEnquiryModel
 * @returns {Error} 500 - internal server error
 */
router.get("/enquiries", isAuthenticatedGuard, isAdminGuard, enquiries.getFiltered);

/**
 * get stats based on enquiries
 * @route GET /manage/enquiries/stats
 * @group manage enquiries
 * @returns {ManageEnquiryStatsModel.model} 200 - ManageEnquiryStatsModel
 * @returns {Error} 500 - internal server error
 */
router.get("/enquiries/stats", isAuthenticatedGuard, isAdminGuard, enquiries.stats);

/**
 * update an enquiry
 * @route PUT /manage/enquiries/{enquiryId}
 * @group manage enquiries
 * @param {string} enquiryId.path.required
 * @param {ManageEnquiryUpdateModel.model} ManageEnquiryUpdateModel.body.required
 * @returns {ManageEnquiryModel.model} 200 - ManageEnquiryModel
 * @returns {Error} 400 - validation error
 * @returns {Error} 404 - enquiry not found
 * @returns {Error} 500 - internal server error
 */
router.put("/enquiries/:enquiryId", isAuthenticatedGuard, isAdminGuard, enquiries.update);


module.exports = router;

