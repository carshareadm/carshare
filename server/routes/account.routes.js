const register = require("../controllers/account/register.controller");
const login = require("../controllers/account/login.controller");
var express = require("express");
var router = express.Router();

/**
 * @typedef RegisterModel
 * @property {string} email.required
 * @property {string} mobile.required
 * @property {string} password.required
 */

/**
 * @typedef LoginModel
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @route POST /account/register
 * @group account
 * @param {RegisterModel.model} registerModel.body.required - user details
 * @returns {string} 200 - new user id
 * @returns {Error} 400 - validation errors
 * @returns {Error} 500 - database errors
 */
router.post("/register", register.register);

/**
 * @route POST /account/login
 * @group account
 * @param {LoginModel.model} loginModel.body.required - user creds
 * @returns {string} 200 - todo: JWT
 * @returns {Error} 401 - authentication issues
 */
router.post("/login", login.login);

module.exports = router;