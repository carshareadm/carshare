const license = require("../controllers/license/license.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
const licenseGuard = require("../middleware/licenseGuard");
var express = require("express");
var router = express.Router();


router.get("/:id", isAuthenticatedGuard, licenseGuard, license.getById);
router.put("/:id/image", isAuthenticatedGuard, licenseGuard, license.updateLicenseImage);
router.put("/:id/number", isAuthenticatedGuard, licenseGuard, license.updateLicenseNumber);

module.exports = router;