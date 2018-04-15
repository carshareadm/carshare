const sms = require("../controllers/confirm/sms.controller");
const email = require("../controllers/confirm/email.controller");
const confirm = require("../controllers/confirm/confirm.controller");
const isAuthenticatedGuard = require("../middleware/isAuthenticatedGuard");
var express = require("express");
var router = express.Router();

router.post("/sms", isAuthenticatedGuard, sms.generateConfirmSms);
router.post("/email", isAuthenticatedGuard, email.generateConfirmSms);
router.post("/", isAuthenticatedGuard, confirm.verifyCode);

module.exports = router;