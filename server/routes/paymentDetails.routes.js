/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Jason Koh
 */
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
  * @property {string} expiryMonth
  * @property {string} expiryYear
  */

/**
 * get payment
 * @route GET /paymentDetails/my
 * @group paymentDetails
 * @returns {PaymentDetailsModel.model} 200
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.get('/my', isAuthenticatedGuard, paymentDetails.getMyPaymentDetails);

/**
 * create payment details
 * @route POST /paymentDetails/add
 * @group paymentDetails
 * @param {CardModel.model} CardModel.body.required
 * @returns {CardModel.model} 200
 * @returns {Error} 400 - invalid card info
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.post('/add', isAuthenticatedGuard, paymentDetails.addPaymentDetails);

/**
 * update payment details
 * @route PUT /paymentDetails/update
 * @group paymentDetails
 * @param {CardModel.model} CardModel.body.required
 * @returns {CardModel.model} 200
 * @returns {Error} 400 - invalid card info
 * @returns {Error} 401 - user not authenticated
 * @returns {Error} 404 - card not found
 * @returns {Error} 500 - internal server error
 */
router.put('/update', isAuthenticatedGuard, paymentDetails.updatePaymentDetails);

module.exports = router;
