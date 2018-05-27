/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const sms = require("../controllers/confirm/sms.controller");
const email = require("../controllers/confirm/email.controller");
const confirm = require("../controllers/confirm/confirm.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
var express = require("express");
var router = express.Router();

/**
 * @typedef SendConfirmCodeModel
 * @property {string} codeType - valid values are ['Register', 'AccountUpdate']
 * @property {string} userId -  the user to send code to
 */

/**
 * @typedef ValidateConfirmCodeModel
 * @property {string} codeType - valid values are ['Register', 'AccountUpdate']
 * @property {string} code -  the code to validate
 */

/**
 * request a confirmation code via SMS
 * @route POST /confirm/sms
 * @group confirm
 * @param {SendConfirmCodeModel.model} SendConfirmCodeModel.body.required
 * @returns {} 200 - OK
 * @returns {Error} 400 - unknown code type
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.post("/sms", isAuthenticatedGuard, sms.generateConfirmSms);

/**
 * request a confirmation code via email
 * @route POST /confirm/email
 * @group confirm
 * @param {SendConfirmCodeModel.model} SendConfirmCodeModel.body.required
 * @returns {} 200 - OK
 * @returns {Error} 400 - unknown code type
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.post("/email", isAuthenticatedGuard, email.generateConfirmSms);

/**
 * validate a confirmation code
 * @route POST /confirm
 * @group confirm
 * @param {ValidateConfirmCodeModel.model} ValidateConfirmCodeModel.body.required
 * @returns {} 200 - OK
 * @returns {Error} 400 - unknown code type
 * @returns {Error} 400 - code has expired
 * @returns {Error} 404 - code not found
 * @returns {Error} 500 - internal server error
 */
router.post("/", isAuthenticatedGuard, confirm.verifyCode);

module.exports = router;