const contact = require("../controllers/contact/contact.controller");
var express = require("express");
var router = express.Router();


/**
 * @typedef ContactModel
 * @property {string} emailFrom - the email of the enquirer
 * @property {string} name - the name of the enquirer
 * @property {string} message - the actual enquiry message
 * @property {string} priority - one of ["low", "med", "high"]
 */

/**
 * record an enquiry posted form the website Contact page and send notification emails
 * @route POST /contact/add
 * @group contact
 * @param {ContactModel.model} ContactModel.body.required
 * @returns {object} 200 - the saved enquiry
 * @returns {Error} 400 - validation error
 * @returns {Error} 404 - user not found
 * @returns {Error} 500 - internal server error
 */
router.post('/add', contact.addEnquiry);

module.exports = router;
