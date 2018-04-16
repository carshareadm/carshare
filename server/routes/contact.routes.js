const contact = require("../controllers/contact/contact.controller");
var express = require("express");
var router = express.Router();


router.post('/add', contact.addEnquiry);

module.exports = router;
