/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/26
 * Authors
 *               - Paul Crow
 */
const license = require("../controllers/license/license.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const licenseGuard = require("../middleware/licenseGuard");
var express = require("express");
var router = express.Router();

/**
 * get a license by id.
 * only an admin or the owner of the license should be able to view it
 * @route GET /license/{id}
 * @group license
 * @param {string} id.path.required
 * @returns {object} 200 - the license object
 * @returns {Error} 401 - user is not admin and license doesn't belong to user
 * @returns {Error} 404 - license not found
 * @returns {Error} 500 - internal server error
 */
router.get("/:id", isAuthenticatedGuard, licenseGuard, license.getById);

/**
 * update the image associated with a license.
 * only an admin or the owner of the license should be able to update it
 * @route PUT /license/{id}/image
 * @group license
 * @param {string} id.path.required
 * @param {string} imageId.body.required - the id of the image to add to license
 * @returns 200 - OK
 * @returns {Error} 401 - user is not admin and license doesn't belong to user
 * @returns {Error} 404 - license not found
 * @returns {Error} 500 - internal server error
 */
router.put("/:id/image", isAuthenticatedGuard, licenseGuard, license.updateLicenseImage);

/**
 * update the number associated with a license.
 * only an admin or the owner of the license should be able to update it
 * @route PUT /license/{id}/number
 * @group license
 * @param {string} id.path.required
 * @param {string} licenseNumber.body.required - the new license number
 * @returns 200 - OK
 * @returns {Error} 401 - user is not admin and license doesn't belong to user
 * @returns {Error} 404 - license not found
 * @returns {Error} 500 - internal server error
 */
router.put("/:id/number", isAuthenticatedGuard, licenseGuard, license.updateLicenseNumber);

module.exports = router;