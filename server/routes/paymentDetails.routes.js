const paymentDetails = require("../controllers/paymentDetails/paymentDetails.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
var express = require("express");
var router = express.Router();
/**
 * @typedef PaymentDetailsModel
 * @property {string} _id
 * @property {string} creditCard
 */

 /**
  * @typedef CardModel
  * @property {string} _id
  * @property {string} cardNumber
  * @property {string} nameOnCard
  * @property {string} ccv
  * @property {string} expiryMonth
  * @property {string} expiryYear

/**
 * @route GET /paymentDetails/my
 * @group profile
 * @returns {PaymentDetailsModel.model} 200
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.get('/my', isAuthenticatedGuard, paymentDetails.getMyPaymentDetails);

/**
 * @route POST /paymentDetails/add
 * @group profile
 * @returns {CardModel.model} 200
 * @returns {Error} 400 - invalid card info
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.post('/add', isAuthenticatedGuard, paymentDetails.addPaymentDetails);

/**
 * @route PUT/paymentDetails/update
 * @group profile
 * @returns {CardModel.model} 200
 * @returns {Error} 400 - invalid card info
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - card not found
 * @returns {Error} 500 - internal server error
 */
router.put('/update', isAuthenticatedGuard, paymentDetails.updatePaymentDetails);

module.exports = router;
